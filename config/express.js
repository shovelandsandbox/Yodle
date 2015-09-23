var express = require('express');
var glob = require('glob');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

var jwt = require('jsonwebtoken');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  app.use(function(req, res, next) {
    var token = req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;
          next();
        }
      });

    } else {

      if(req._parsedUrl.pathname.match(/users\/auth$/)) {
        next();
        return;
      }

      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });

    }
  });

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.send({
        status: err.status,
        message: err.toString()
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.send({
        status: err.status,
        message: err.toString()
      });
  });

};
