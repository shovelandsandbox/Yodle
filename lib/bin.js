#! /usr/bin/env node

var Cli = require('./commands/cli');
var cli = new Cli();

var config = cli.configure(process.argv.slice(2));

if(config === -1) console.log('Invalid Port');
else if(config === -2) console.log('Invalid Mongo Server');
else {
  for (var attrname in config) {
    process.env[attrname] = config[attrname];
  }

  if (process.env.DAEMON === "true") {
    require('../app.js')
  } else {
    var readline = require('readline');
    var rl = readline.createInterface(process.stdin, process.stdout);
    var applesauce = require('../index');

    cli.startCli(readline, rl, applesauce, function() {
      console.log("goodbye");
      process.exit(0);
    });
  }
}
