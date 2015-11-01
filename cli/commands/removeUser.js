var fs = require('fs');

module.exports = {
	name: 'removeUser',
	usage: 'remove("email")',
	description: 'removes the specified user from the current diary',
  alias: [
		'removeUser',
		'remove'
  ],
  execute: function(yodle, email) {
	  return yodle.remove(email).then(function(data) {
	      return data;
	    });
	}
};
