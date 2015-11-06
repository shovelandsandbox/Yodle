#! /usr/bin/env node

function isInt(n) {
  return Number(n) == n && n % 1 === 0;
};

function configure(userArgs) {
  var config = {};

  for (var i in userArgs) {
    i = parseInt(i);
    var arg = userArgs[i];
    var nextArg = userArgs[i + 1];

    switch(arg) {
      case '-d':
      case '--daemon':
        config.daemon = true;
        break;

      case '-h':
      case '--host':
        config.server = nextArg;
        break;

      case '-l':
      case '--project':
        config.project = nextArg;
        break;

      case '-p':
      case '--port':
        if (!isInt(nextArg)) {
          return -1;
        }

        config.port = nextArg;
        break;

      case '-m':
      case '--mongo':
        if (!nextArg) {
          return -2;
        }
        config.db = nextArg;
        break;

      case '-?':
      case '--help':
        console.log("    -?, --help                        this menu!");
        console.log("  ====== run a server");
        console.log("   yodle --daemon --port 3000 --mongo mongodb://mongoUrl/database");
        console.log("    -d, --daemon                       daemon mode");
        console.log("    -p [port], --port [port]           port");
        console.log("    -m [server], --mongo [server]      mongo server");
        console.log("  ====== connect to a server");
        console.log("   yodle --project projectId --server http://localhost --port 3000");
        console.log("    -h [host], --host [host]           yodle server");
        console.log("    -p [port], --port [port]           port");
        console.log("    -l [project], --project [project]  project");
        return -3;
    }
  }

  return config;
};

var commandLineConfig = configure(process.argv.slice(2));

if(commandLineConfig === -1) console.log('Invalid Port');
else if(commandLineConfig === -2) console.log('Invalid Mongo Server');
else {
  var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  var config = {
    configFile: home + '/.yodle/config.json'
  };

  var fs = require('fs');

  fs.readFile(config.configFile, 'utf8', function(err, data) {
    // set global config to config.json values
    if (!err) {
      var json = JSON.parse(data);

      for (var attrname in json) {
        config[attrname] = json[attrname];
      }
    }

    // override with cli values
    for (var attrname in commandLineConfig) {
      config[attrname] = commandLineConfig[attrname];
    }

    config.protocol = 'http';

    if (config.daemon === true) {
      if(config.port) process.env.PORT = config.port;
      if(config.db) process.env.DB = config.db;

      require('./server');
    } else {
      var Yodle = require('./');
      var Cli = require('./cli/index');

      var rl = require('readline').createInterface(process.stdin, process.stdout);

      var cli = new Cli(config, rl, Yodle);

      cli.start(function() {
        console.log("goodbye");
        process.exit(0);
      });
    }
  });
}
