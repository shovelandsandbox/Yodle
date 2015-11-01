var api = require('../api.js');

module.exports = {
  name: 'log',
  usage: 'log("level", "code", "message")',
  description: 'adds a log to the current diary',
  alias: [
    'log'
  ],
  execute: function(level, code, message) {
      return api.call({
          level: level,
          code: code,
          message: message
        }, '/diaries/' + global.yodle.config.DIARY + '/entries', 'POST');
    }
};