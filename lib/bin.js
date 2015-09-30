#! /usr/bin/env node

var Cli = require('./commands/cli');

var cli = new Cli();

var config = cli.configure(process.argv.slice(2));
for (var attrname in config) { process.env[attrname] = config[attrname]; }
if(process.env.DAEMON === "true") {
  require('../app.js')
} else {
  cli.startCli();
}
