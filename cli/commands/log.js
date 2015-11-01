module.exports = {
  name: 'log',
  usage: 'log("level", "code", "message")',
  description: 'adds a log to the current diary',
  alias: [
    'log(?![a-z])'
  ],
  execute: function(level, code, message) {
      return this.yodle.log(level, code, message).then(function(json) {
          var output = 'Done.';

          for(var i in json) {
            output += '\n\r' + json[i];
          }

          return output;
        });
    }
};