module.exports = {
  name: 'tags',
  execute: function(email) {
    return this.api.call({
      email: email
    }, '/projects/' + this.config.project + '/tags', 'GET');
  }
}
