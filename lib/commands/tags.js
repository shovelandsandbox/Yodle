module.exports = {
  name: 'tags',
  execute: function(email) {
    return this.api.call({
    }, '/projects/' + this.config.project + '/tags', 'GET');
  }
}
