module.exports = {
  name: 'getLogs',
	execute: function(query) {
  		query = query ? query : {};

  		return this.api.call(query, '/diaries/' + global.yodle.config.DIARY + '/entries', 'GET');
	}
};
