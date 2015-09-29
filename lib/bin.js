#! /usr/bin/env node

var Cli = require('./cli');

var cli = new Cli();

cli.configure();
if(process.env.DAEMON === "true") {
  require('../app.js')
} else {
  cli.startCli();
}
