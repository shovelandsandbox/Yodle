function Cli() {}

Cli.prototype.isInt = function(n) {
  return Number(n) == n && n % 1 === 0;
};

Cli.prototype.configure = function(userArgs) {
  var config = {};

  config.DAEMON = false;
  config.PORT = 3000;
  config.HOST = 'localhost';
  config.DB = 'mongodb://localhost/applesauce-development';
  config.DIARY = null;

  for (var i in userArgs) {
    i = parseInt(i);
    var arg = userArgs[i];
    var nextArg = userArgs[i + 1];

    if (['-d', '--daemon'].indexOf(arg) >= 0) {
      config.DAEMON = true;
    }

    if (['-h', '--host'].indexOf(arg) >= 0) {
      config.HOST = nextArg;
    }

    if (['-l', '--logbook'].indexOf(arg) >= 0) {
      config.DIARY = nextArg;
    }

    if (['-p', '--port'].indexOf(arg) >= 0) {
      if (!this.isInt(nextArg)) {
        return -1;
      }

      config.PORT = nextArg;
    }

    if (['-m', '--mongo'].indexOf(arg) >= 0) {
      if (!nextArg) {
        return -2;
      }
      config.DB = nextArg;
    }

    if (['-?', '--help'].indexOf(arg) >= 0) {
      console.log("-?, --help                       this menu!");
      console.log("-d, --daemon                     daemon mode");
      console.log("-l [diary], --logbook [diary]    diary");
      console.log("-p [port], --port [port]         port");
      console.log("-m [server], --mongo [server]    mongo server (daemon mode only)");
      console.log("-h [host], --host [host]         applesauce server");
      return -3;
    }
  }

  return config;
};

Cli.prototype.loadFromFile = function(path, callback) {
  var fs = require('fs');

  fs.readFile(path, 'utf8', function(err, data) {
    global.applesauce.token = data;

    callback();
  });
};

Cli.prototype.execute = function(applesauce, command, callback) {
  try {
    eval('applesauce.' + command).then(callback, callback);
  } catch(e) {
    callback(e);
  }
};

Cli.prototype.turnOnPrompt = function(rl, callback, closedCallback) {
  rl.setPrompt('# ');
  rl.prompt();

  rl.on('line', function(command) {
    if (command === "bye") rl.close();
    else callback(command);
  }).on('close',function() {
    closedCallback();
  });
};

Cli.prototype.startCli = function(readline, rl, applesauce) {
  global.applesauce = { config: require('./../config.js')() };

  var self = this;
  this.loadFromFile('/tmp/applesauceuser', function() {
    self.turnOnPrompt(rl, function (command) {
      self.execute(applesauce, command, function(output) {
        console.log(output);
        rl.prompt();
      });
    }, function() {
      console.log("goodbye");
      process.exit(0);
    });
  });
};

var cli = module.exports = exports = Cli;
