module.exports = {
  name: 'log',
  execute: function(level, message, code) {
      return this.api.call({
          level: level,
          code: code,
          message: message
        }, '/projects/' + this.config.project + '/entries', 'POST');
    }
};
