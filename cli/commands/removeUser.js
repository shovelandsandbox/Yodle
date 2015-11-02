var fs = require('fs');

module.exports = {
	name: 'removeUser',
	usage: 'remove("email")',
	description: 'removes the specified user from the current project',
  alias: [
		'removeUser',
		'remove'
  ],
  execute: function(email) {
	  return this.yodle.remove(email).then(function(data) {
	      return data;
	    });
	}
};
