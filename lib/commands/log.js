module.exports = {
  name: 'log',
  execute: function(data) {
    if(typeof data !== 'object') {
      data = {
        message: data
      };
    }

    return this.api.call(data, '/projects/' + this.config.project + '/entries', 'POST');
  }
};
