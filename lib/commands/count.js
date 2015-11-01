var api = require('../api.js');

module.exports = {
	name: 'count',
	usage: 'count(query)',
	description: 'performs a count on the given query',
	alias: [
		'count'
	],
	api: function(query) {
		query = query ? query : {};

		return api.call(query, '/diaries/' + global.yodle.config.DIARY + '/entries?metaOnly=true', 'GET');
	}
};
