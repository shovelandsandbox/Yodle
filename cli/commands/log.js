module.exports = {
  name: 'log',
  usage: 'log("level", "code", "message")',
  description: 'adds a log to the current project',
  alias: [
    'log'
  ],
  execute: function(data) {
      return this.yodle.log(data).then(function(json) {
          var output = 'Done.';
          return output;
        });
    }
};
