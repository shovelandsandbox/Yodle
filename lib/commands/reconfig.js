module.exports = {
  name: 'config',
  execute: function(config) {
    for(var i in config) {
      this.config[i] = config[i];
      if(i == 'token') this.api.config.token = config[i]
    }
    return true;
  }
}
