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
}

if(!daemon) {
  console.log("-d, --daemon                     daemon mode");
  console.log("-p [port], --port [port]         port");
  console.log("-m [server], --mongo [server]    mongo server (daemon mode only)");
  console.log("-h [host], --host [host]         aplesauce server");
} else {
  require('../app.js')
}
