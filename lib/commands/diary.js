var api = require('../api.js');

module.exports = {
	name: 'diary',
	alias: [
		'diary',
		'new'
	],
	api: function(name) {
	  return api.call({
	    	name: name
	    }, '/diaries/', 'POST').then(function(json) {
	    	return 'done';
	  });
	}
};
