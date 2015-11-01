module.exports = {
	name: 'count',
	usage: 'count(query)',
	description: 'performs a count on the given query',
	alias: [
		'count'
	],
	execute: function(yodle, query) {
  		query = query ? query : {};
  		
		return yodle.count(query).then(function(json) {
	   		var output = 'Logs: ' + json.count;

	    	return output;
	    });
	}
};
