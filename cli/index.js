var debug = require('debug')('yodle');

function Cli(config, rl, yodle) {
  this.config = config;
  this.rl = rl;
  this.Yodle = yodle;
}

Cli.prototype.processLine = function(command, callback) {
  try {
    this.yodle = this.Yodle.getInstance(this.config);

    if(this.execute(command, callback)) return;

    eval(command);

    callback();
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

Cli.prototype.start = function(exit) {
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
