'use strict';

//global.TUNGUS_DB_OPTIONS =  { nativeObjectID: false };

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  SwaggerExpress = require('swagger-express-mw'),
  //tungus = require('tungus'),
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/api/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

SwaggerExpress.create({
  appRoot: __dirname 
}, function(err, swaggerExpress) {
  if (err) { throw err; }

  app.use(swaggerExpress.runner.swaggerTools.swaggerUi());

  swaggerExpress.runner.config.swagger.securityHandlers = {
  	'X-Access-Token': function (request, securityDefinition, scopes, callback) {
		var jwt = require('jsonwebtoken');
	    var token = request.headers['x-access-token'];

	    if(request._parsedUrl.pathname.match(/users\/auth$/)) {
	      return callback();
	    }

	    if (token) {
	      jwt.verify(token, config.secret, function(err, decoded) {
	        if (err) {
	          return callback(new Error("Failed to authenticate token"));
	        } else {
	          request.decoded = decoded;
	          return callback();
	        }
	      });
	    } else {
	          return callback(new Error("No token provided"));	
	    }
    }
  }


  // install middleware
  app.use(swaggerExpress.metadata());
  app.use(swaggerExpress.security());
  app.use(swaggerExpress.validator());
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
  app.use(swaggerExpress.expressCompatibilityMW());
  app.use(swaggerExpress.router());
});	

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

