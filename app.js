#! /usr/bin/env node

var userArgs = process.argv.slice(2);

function isInt(n) {
  return Number(n) == n && n % 1 === 0;
}

var port;
var mongoServer;
var daemon;
var autoCreateDiaries;
for(var i in userArgs) {
  i = parseInt(i);
  var arg = userArgs[i];
  var nextArg = userArgs[i + 1];

  if(['-d', '--daemon'].indexOf(arg) >= 0) {
    daemon = true;
  }

  if(['-p', '--port'].indexOf(arg) >= 0) {
    if(!isInt(nextArg)) {
      console.log('Invalid Port');
      return;
    }

    port = nextArg;
  }

  if(['-m', '--mongo'].indexOf(arg) >= 0) {
    if (!naxtArg) {
      console.log('Invalid Mongo Server');
      return;
    }
    mongoServer = naxtArg;
  }

  if(['-a', '--autoCreateDiaries'].indexOf(arg) >= 0) {
    autoCreateDiaries = true;
  }
}

if(!daemon) {
  console.log("-d, --daemon                     daemon mode");
  console.log("-p [port], --port [port]         port");
  console.log("-m [server], --mongo [server]    mongo server");

  return;
}

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  //tungus = require('tungus'),
  mongoose = require('mongoose');

if(port) config.port = port;
if(mongoServer) config.db = mongoServer;
if(autoCreateDiaries) config.autoCreateDiaries = autoCreateDiaries;

console.log("Running in debug mode...");
console.log("Port: " + config.port);
console.log("db: " + config.db);

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

