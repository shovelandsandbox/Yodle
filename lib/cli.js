#! /usr/bin/env node

var userArgs = process.argv.slice(2);

function isInt(n) {
  return Number(n) == n && n % 1 === 0;
}


var daemon = false;
var autoCreateDiaries = false;
for(var i in userArgs) {
  i = parseInt(i);
  var arg = userArgs[i];
  var nextArg = userArgs[i + 1];

  if(['-d', '--daemon'].indexOf(arg) >= 0) {
    daemon = true;
  }

  if(['-h', '--host'].indexOf(arg) >= 0) {
    process.env.HOST = arg;
  }

  if(['-p', '--port'].indexOf(arg) >= 0) {
    if(!isInt(nextArg)) {
      console.log('Invalid Port');
    }

    process.env.PORT = nextArg;
  }

  if(['-m', '--mongo'].indexOf(arg) >= 0) {
    if (!naxtArg) {
      console.log('Invalid Mongo Server');
    }
    process.env.DB = naxtArg;
  }

  if(['-a', '--autoCreateDiaries'].indexOf(arg) >= 0) {
    process.env.AUTO_CREATE_DIARIES = true;
  }

  if(['-?', '--help'].indexOf(arg) >= 0) {
    console.log("-?, --help                       this menu!");
    console.log("-d, --daemon                     daemon mode");
    console.log("-p [port], --port [port]         port");
    console.log("-m [server], --mongo [server]    mongo server (daemon mode only)");
    console.log("-h [host], --host [host]         aplesauce server");
  }
}

if(!daemon) {
  var readline = require('readline');
  var rl = readline.createInterface(process.stdin, process.stdout);

  rl.setPrompt('# ');
  rl.prompt();
  rl.on('line', function(line) {
    execute(line, rl);
    if (line === "bye") rl.close();
  }).on('close',function() {
    console.log("goodbye");
    process.exit(0);
  });
} else {
  require('../app.js')
}

function execute(command, rl) {
  var getLogs = require('./getLogs.js');
  var log = require('./log.js');
  
  eval(command).then(function() {
    rl.prompt();
  });
}
