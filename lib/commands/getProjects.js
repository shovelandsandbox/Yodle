module.exports = {
  name: 'getProjects',
	execute: function() {
  	return this.api.call({}, '/projects', 'GET');
  }
};
