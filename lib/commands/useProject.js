module.exports = {
	name: 'useProject',
  execute: function(name) {
	  return this.api.call({}, '/projects/?' + 'search=' + name, 'GET');
	}
};