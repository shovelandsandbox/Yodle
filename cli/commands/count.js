module.exports = {
	name: 'count',
	usage: 'count(query)',
	description: 'performs a count on the given query',
	alias: [
		'count'
	],
	execute: function(applesauce, query) {
  		query = query ? query : {};
  		
		return applesauce.count(query).then(function(json) {
	   		var output = 'Logs: ' + json.count;

	    	return output;
	    });
	}
};
