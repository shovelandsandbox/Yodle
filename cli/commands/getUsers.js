module.exports = {
	name: 'getUsers',
	usage: 'users()',
	description: 'gets the users for the current diary',
	alias: [
		'getUsers',
		'users'
	],
	execute: function(yodle) {
		return yodle.users().then(function(json) {
  			var output = 'Users:';

  			for(var i in json) {
    			output += '\n\r' + json[i];
  			}

  			return output;
		});
	}
};
