var api = require('../api.js');

module.exports = {
	name: 'addUser',
	usage: 'add("email")',
	description: 'adds a user by email to the current diary',
	alias: [
		'addUser',
		'add'
	],
	execute: function(email) {
	  return api.call({
	    email: email
	  }, '/diaries/' + global.yodle.config.DIARY + '/users', 'POST');
	}
}