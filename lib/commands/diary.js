var api = require('../api.js');

module.exports = {
	name: 'diary',
	usage: 'new("diary name")',
	description: 'creates a new diary with the given name',
	alias: [
		'diary',
		'new'
	],
	execute: function(name) {
	  return api.call({
	    	name: name
	    }, '/diaries/', 'POST');
	}
};
