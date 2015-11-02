module.exports = {
  name: 'log',
  execute: function(level, code, message) {
      return this.api.call({
          level: level,
          code: code,
          message: message
        }, '/projects/' + global.yodle.config.PROJECT + '/entries', 'POST');
    }
};