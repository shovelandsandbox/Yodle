module.exports = {
  name: 'config',
  execute: function(config) {
    for(var i in config) {
      this.config[i] = config[i];
    }
    return true;
  }
}
