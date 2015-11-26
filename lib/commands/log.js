module.exports = {
  name: 'log',
  execute: function(data) {
    return this.api.call(data, '/projects/' + this.config.project + '/entries', 'POST');
  }
};
