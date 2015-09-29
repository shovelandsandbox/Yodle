function Cli() {}

Cli.prototype.isInt = function(n) {
  return Number(n) == n && n % 1 === 0;
};

Cli.prototype.configure = function() {
  var userArgs = process.argv.slice(2);

  process.env.DAEMON = false;
  for (var i in userArgs) {
    i = parseInt(i);
    var arg = userArgs[i];
    var nextArg = userArgs[i + 1];

    if (['-d', '--daemon'].indexOf(arg) >= 0) {
      process.env.DAEMON = true;
    }

    if (['-h', '--host'].indexOf(arg) >= 0) {
      process.env.HOST = nextArg;
    }

    if (['-l', '--logbook'].indexOf(arg) >= 0) {
      process.env.DIARY = nextArg;
    }

    if (['-p', '--port'].indexOf(arg) >= 0) {
      if (!this.isInt(nextArg)) {
        console.log('Invalid Port');
      }

      process.env.PORT = nextArg;
    }

    if (['-m', '--mongo'].indexOf(arg) >= 0) {
      if (!naxtArg) {
        console.log('Invalid Mongo Server');
      }
      process.env.DB = naxtArg;
    }

    if (['-?', '--help'].indexOf(arg) >= 0) {
      console.log("-?, --help                       this menu!");
      console.log("-d, --daemon                     daemon mode");
      console.log("-l [diary], --logbook [diary]    diary");
      console.log("-p [port], --port [port]         port");
      console.log("-m [server], --mongo [server]    mongo server (daemon mode only)");
      console.log("-h [host], --host [host]         applesauce server");
    }
  }
};

Cli.prototype.startCli = function() {
  var fs = require('fs');
  var readline = require('readline');
  var rl = readline.createInterface(process.stdin, process.stdout);
  global.applesauce = {
    config: require('./config.js')()
  };

  var self = this;

  fs.readFile('/tmp/applesauceuser', 'utf8', function(err, data) {
    global.applesauce.token = data;

    rl.setPrompt('# ');
    rl.prompt();
    rl.on('line', function(line) {
      if (line === "bye") rl.close();
      else self.execute(line, rl);
    }).on('close',function() {
      console.log("goodbye");
      process.exit(0);
    });
  });
};

Cli.prototype.execute = function(command, rl) {
  var addUser = require('./commands/addUser');
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
    }, function(output) {
      console.log(output);
      rl.prompt();
    });
  } catch(e) {
    console.log(e);
    rl.prompt();
  }
};

var cli = module.exports = exports = Cli;
