#! /usr/bin/env node

var userArgs = process.argv.slice(2);

function isInt(n) {
  return Number(n) == n && n % 1 === 0;
}


var daemon = false;
for(var i in userArgs) {
  i = parseInt(i);
  var arg = userArgs[i];
  var nextArg = userArgs[i + 1];

  if(['-d', '--daemon'].indexOf(arg) >= 0) {
    daemon = true;
  }

  if(['-h', '--host'].indexOf(arg) >= 0) {
    process.env.HOST = nextArg;
  }

  if(['-l', '--logbook'].indexOf(arg) >= 0) {
    process.env.DIARY = nextArg;
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

  if(['-?', '--help'].indexOf(arg) >= 0) {
    console.log("-?, --help                       this menu!");
    console.log("-d, --daemon                     daemon mode");
    console.log("-l [diary], --logbook [diary]    diary");
    console.log("-p [port], --port [port]         port");
    console.log("-m [server], --mongo [server]    mongo server (daemon mode only)");
    console.log("-h [host], --host [host]         applesauce server");
  }
}

if(!daemon) {
  var fs = require('fs');
  var readline = require('readline');
  var rl = readline.createInterface(process.stdin, process.stdout);
  global.applesauce = {
    config: require('./config.js')()
  };


  fs.readFile('/tmp/applesauceuser', 'utf8', function(err, data) {
    global.applesauce.token = data;

    rl.setPrompt('# ');
    rl.prompt();
    rl.on('line', function(line) {
      if (line === "bye") rl.close();
      else execute(line, rl);
    }).on('close',function() {
      console.log("goodbye");
      process.exit(0);
    });
  });
} else {
  require('../app.js')
}

function execute(command, rl) {
  var getLogs = require('./commands/getLogs');
  var log = require('./commands/log');
  var login = require('./commands/login');
  var diary = require('./commands/diary');
  var getDiaries = require('./commands/getDiaries');
  var useDiary = require('./commands/useDiary');

  try {
    eval(command).then(function (output) {
      console.log(output);
      rl.prompt();
    });
  } catch(e) {
    console.log(e);
    rl.prompt();
  }
}
