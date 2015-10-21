var fs = require('fs');
var api = require('../api.js');

module.exports = {
	name: 'removeUser',
	usage: 'remote("email")',
	description: 'removes the specified user from the current diary',
  alias: [
		'removeUser',
		'remove'
  ],
  function(email) {
	  return api.call({user: email}, '/diaries/' + global.applesauce.config.DIARY + '/users?user=' + email, 'DELETE')
	    .then(function(data) {
	      return data;
	    });
	}
};
