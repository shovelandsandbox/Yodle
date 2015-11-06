module.exports = {
  name: 'log',
  execute: function(level, code, message) {
      return this.api.call({
          level: level,
          code: code,
          message: message
        }, '/projects/' + this.config.project + '/entries', 'POST');
    }
};
