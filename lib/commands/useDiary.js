module.exports = {
	name: 'useDiary',
  execute: function(name) {
	  return this.api.call({}, '/diaries/?' + 'search=' + name, 'GET');
	}
};