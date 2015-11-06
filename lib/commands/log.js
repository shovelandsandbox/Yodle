module.exports = {
  name: 'log',
  execute: function(level, message, code) {
      return this.api.call({
          level: JSON.stringify(level),
          code: JSON.stringify(code),
          message: JSON.stringify(message)
        }, '/projects/' + this.config.project + '/entries', 'POST');
    }
};
