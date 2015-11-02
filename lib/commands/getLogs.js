module.exports = {
  name: 'getLogs',
	execute: function(query) {
  		query = query ? query : {};

  		return this.api.call(query, '/projects/' + global.yodle.config.PROJECT + '/entries', 'GET');
	}
};
