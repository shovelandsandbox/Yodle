#! /usr/bin/env node

// TODO: this should all be done below once we have determined that we aren't starting a server
// TODO: cli.configure needs to be moved into it's own utility
var Yodle = require('./');
var rl = require('readline').createInterface(process.stdin, process.stdout);
var Cli = require('./cli/index');
var yodle = new Yodle();
var cli = new Cli(rl, yodle);

// load config from CLI
var config = cli.configure(process.argv.slice(2));

if(config === -1) console.log('Invalid Port');
else if(config === -2) console.log('Invalid Mongo Server');
else {
  var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  global.yodle = {
    configFile: home + '/.yodle/config.json',
    config: {}
  };
  
  var fs = require('fs');
  
  fs.readFile(global.yodle.configFile, 'utf8', function(err, data) {
    // set global config to config.json values
    if (!err) {
      var json = JSON.parse(data);
      
      for (var attrname in json) {
        global.yodle.config[attrname] = json[attrname];
      }
    }

    // override with cli values
    for (var attrname in config) {
      global.yodle.config[attrname] = config[attrname];
    }

    global.yodle.config.PROTOCOL = 'http';

    if (global.yodle.config.DAEMON === true) {
      if(global.yodle.config.PORT) process.env.PORT = global.yodle.config.PORT;
      if(global.yodle.config.DB) process.env.DB = global.yodle.config.DB;

      require('./server');
    } else {
      cli.startCli(function() {
        console.log("goodbye");
        process.exit(0);
      });
    }
  });
}
