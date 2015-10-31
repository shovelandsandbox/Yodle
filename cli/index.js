var debug = require('debug')('applesauce');

function Cli(rl, applesauce) { 
  this.rl = rl;
  this.applesauce = applesauce;
}

Cli.prototype.isInt = function(n) {
  return Number(n) == n && n % 1 === 0;
};

Cli.prototype.configure = function(userArgs) {
  var config = {};

  for (var i in userArgs) {
    i = parseInt(i);
    var arg = userArgs[i];
    var nextArg = userArgs[i + 1];

    switch(arg) {
      case '-d':
      case '--daemon':
        config.DAEMON = true;
        break;

      case '-h':
      case '--host':
        config.HOST = nextArg;
        break;

      case '-l':
      case '--logbook':
        config.DIARY = nextArg;
        break;

      case '-p':
      case '--port':
        if (!this.isInt(nextArg)) {
          return -1;
        }

        config.PORT = nextArg;
        break;

      case '-m':
      case '--mongo':
        if (!nextArg) {
          return -2;
        }
        config.DB = nextArg;
        break;

      case '-?':
      case '--help':
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

Cli.prototype.processLine = function(command, callback) {
  try {
    if(this.execute(command, callback)) return;
    
    eval(command);
  } catch(e) {
    debug(e);
    callback(e);
  }
};

Cli.prototype.turnOnPrompt = function(callback, closedCallback) {
  this.rl.setPrompt('# ');
  this.rl.prompt();

  this.rl.on('line', function(command) {
    if (command === "bye") this.rl.close();
    else callback(command);
  }).on('close', closedCallback);
};

Cli.prototype.startCli = function(exit) {
  this.rl.on("SIGINT", function () {
    if(global.socket && global.socket.connected) global.socket.close();
    else process.exit(0);
  });
  
  var self = this;
  var executing = false;

  self.turnOnPrompt(function (command) {
    if(!executing) {
      executing = true;
      self.processLine(command, function(output) {
        executing = false;
        console.log(output);
        self.rl.prompt();
      });
    }
  }, exit);
};

require('../merge')(Cli, __dirname + '/commands/*.js');

var cli = module.exports = exports = Cli;
