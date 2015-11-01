var fs = require('fs');
var api = require('../api.js');

module.exports = {
	name: 'removeUser',
	usage: 'remove("email")',
	description: 'removes the specified user from the current diary',
  alias: [
		'removeUser',
		'remove'
  ],
  execute: function(email) {
	  return api.call({user: email}, '/diaries/' + global.yodle.config.DIARY + '/users?user=' + email, 'DELETE');
	}
};
