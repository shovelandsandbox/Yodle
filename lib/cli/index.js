function Cli() {}

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
  }).on('close', closedCallback);
};

Cli.prototype.startCli = function(rl, applesauce, exit) {

  rl.on("SIGINT", function () {
    // TODO: Kill socket here
  });
  
  var self = this;
  var executing = false;

  self.turnOnPrompt(rl, function (command) {
    if(!executing) {
      executing = true;
      self.execute(applesauce, command, function(output) {
        executing = false;
        console.log(output);
        rl.prompt();
      });
    }
  }, exit);
};

var cli = module.exports = exports = Cli;
