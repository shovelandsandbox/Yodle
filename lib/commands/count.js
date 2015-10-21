var api = require('../api.js');

module.exports = {
	name: 'count',
	alias: [
		'count'
	],
	api: function(query) {
		query = query ? query : {};

		return api.call(query, '/diaries/' + global.applesauce.config.DIARY + '/entries?metaOnly=true', 'GET')
	 	.then(function(json) {
	   		var output = 'Logs: ' + json.count;

	    	return output;
	    });
	}
};
