var api = require('../api.js');

module.exports = {
	name: 'getUsers',
	usage: 'users()',
	description: 'gets the users for the current diary',
	alias: [
		'getUsers',
		'users'
	],
	api: function() {
		return api.call({}, '/diaries/' + global.applesauce.config.DIARY + '/users', 'GET')
		    .then(function(json) {
      			var output = 'Users:';

      			for(var i in json) {
        			output += '\n\r' + json[i];
      			}

      			return output;
    		});
	}
};
