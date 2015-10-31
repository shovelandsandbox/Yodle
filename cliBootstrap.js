#! /usr/bin/env node

// TODO: this should all be done below once we have determined that we aren't starting a server
// TODO: cli.configure needs to be moved into it's own utility
var applesauce = require('./');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
var Cli = require('./cli/index');
var cli = new Cli(rl, applesauce);

// load config from CLI
var config = cli.configure(process.argv.slice(2));

if(config === -1) console.log('Invalid Port');
else if(config === -2) console.log('Invalid Mongo Server');
else {
  var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  global.applesauce = {
    configFile: home + '/.applesauce/config.json',
    config: {}
  };
  
  var fs = require('fs');
  
  fs.readFile(global.applesauce.configFile, 'utf8', function(err, data) {
    // set global config to config.json values
    if (!err) {
      var json = JSON.parse(data);
      
      for (var attrname in json) {
        global.applesauce.config[attrname] = json[attrname];
      }
    }

    // override with cli values
    for (var attrname in config) {
      global.applesauce.config[attrname] = config[attrname];
    }

    if (global.applesauce.config.DAEMON === true) {
      if(global.applesauce.config.PORT) process.env.PORT = global.applesauce.config.PORT;
      if(global.applesauce.config.DB) process.env.DB = global.applesauce.config.DB;

      require('./server');
    } else {
      cli.startCli(function() {
        console.log("goodbye");
        process.exit(0);
      });
    }
  });
}
