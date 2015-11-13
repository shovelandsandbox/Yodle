'use strict';

// global.TUNGUS_DB_OPTIONS =  { nativeObjectID: true };

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  SwaggerExpress = require('swagger-express-mw'),
  debug = require('debug')('yodle'),
  // tungus = require('tungus'),
  mongoose = require('mongoose');

// var yodle = require('../yodle').getInstance({
//   project: '563d06b65135c011002ff49c',
//   server: 'yodle.yetilogs.com'
// });

var app = express();
// app.set('yodle', yodle);

// ************************************************************************************
// Mongoose config
// ************************************************************************************

mongoose.connect(config.DB);
var db = mongoose.connection;
db.on('error', function (err) {
  debug(err);
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/api/models/mongo/*.js');
models.forEach(function (model) {
  require(model);
});

// ************************************************************************************
// Security functions
// ************************************************************************************

function tokenHandler(token, callback) {
  var jwt = require('jsonwebtoken');
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        debug("failed authentication");
        callback(new Error("Failed to authenticate token"), null);
      } else {
        debug("authenticated as " + decoded);
        callback(null, decoded);
      }
    });
  } else {
    debug("no token provided");
    callback(new Error("No token provided"), null);
  }
}

function verifyTokenInHeader(request, securityDefinition, scopes, callback) {
  var allowed = false;

  if(request._parsedUrl.pathname.match(/^\/users\/auth$/) ||
    request._parsedUrl.pathname.match(/^\/users$/)) allowed = true;

  if(request.method == 'POST' && request._parsedUrl.pathname.match(/^\/projects\/[a-z0-9]{24}\/entries$/)) allowed = true;

  if(allowed) {
    return callback();
  }

  tokenHandler(request.headers['x-access-token'], function(err, decoded) {
    if(err) return callback(err)
    request.decoded = decoded;
    callback();
  });
}

// ************************************************************************************
// Let's set up CORS + swagger
// ************************************************************************************

SwaggerExpress.create({
  appRoot: __dirname
}, function(err, swaggerExpress) {
  if (err) { throw err; }

  app.use(function(req, res, next) {
    if(!res.headers) res.headers = {};

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Access-Token, Location');

    if(req.method === "OPTIONS") {
      res.statusCode = 200;
      res.send({
        status: 200,
        message: "okay"
      });
      return;
    }

    return next();
  });

  app.use(swaggerExpress.runner.swaggerTools.swaggerUi());

  swaggerExpress.runner.config.swagger.securityHandlers = {
  	'X-Access-Token': verifyTokenInHeader
  };

  // install middleware
  app.use(swaggerExpress.metadata());
  app.use(swaggerExpress.security());
  app.use(swaggerExpress.validator());
  app.use(swaggerExpress.expressCompatibilityMW());
  app.use(swaggerExpress.router());
});

require('./config/express')(app, config);

// ************************************************************************************
// Configure auth driver
// ************************************************************************************

global.authDriver = require('./api/db/mongo/user');
global.secret = config.secret;

// ************************************************************************************
// It's socket time
// ************************************************************************************

var server = require('http').Server(app);
var io = require('socket.io')(server);

global.io = io;

// io.use(function(socket, next){
//   next();
// });

io.on('connection', function (socket) {
  socket.auth = false;
  socket.on('authenticate', function(data){
    tokenHandler(data.token, function(err, success){
      if (!err && success){
        debug("Authenticated socket ", socket.id);
        socket.auth = success;
        socket.emit('authenticated');
        socket.join(data.room);
      } else {
        debug("Authentication failed for socket");
        socket.emit('unauthorized');
        socket.auth = false;
      }
    });
  });

  setTimeout(function() {
    //If the socket didn't authenticate, disconnect it
    if (!socket.auth) {
      debug("Disconnecting socket ", socket.id);
      socket.disconnect('unauthorized');
    }
  }, 1000);
});


// ************************************************************************************
// Socket time is over, back to normal time
// ************************************************************************************

server.listen(config.port);
