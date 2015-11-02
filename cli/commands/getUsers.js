module.exports = {
	name: 'getUsers',
	usage: 'users()',
	description: 'gets the users for the current project',
	alias: [
		'getUsers',
		'users'
	],
	execute: function() {
		return this.yodle.getUsers().then(function(json) {
  			var output = 'Users:';

  			for(var i in json) {
    			output += '\n\r' + json[i];
  			}

  			return output;
		});
	}
};
