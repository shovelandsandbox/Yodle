var api = require('../api.js');

module.exports = {
	name: 'changeEmail',
	usage: 'email("email")',
	description: 'changes your email to some email',
	alias: [
		'changeEmail',
		'set\semail',
		'email'
	],
	execute: function(email) {
	  return api.call({
	    email: email
	  }, '/users/me', 'PATCH');
	}
};