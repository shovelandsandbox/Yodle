module.exports = {
  name: 'log',
  execute: function(level, code, message) {
      return this.api.call({
          level: level,
          code: code,
          message: message
        }, '/diaries/' + global.yodle.config.DIARY + '/entries', 'POST');
    }
};