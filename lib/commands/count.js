module.exports = {
	name: 'count',
	execute: function(query) {
		query = query ? query : {};

		return this.api.call(query, '/diaries/' + global.yodle.config.DIARY + '/entries?metaOnly=true', 'GET');
	}
};
