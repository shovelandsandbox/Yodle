var fs = require('fs');
var api = require('../api.js');

module.exports = {
	name: 'login',
	usage: 'login("email", "password")',
	description: 'log in as that user you like so much',
	alias: [
		'login'
	],
	execute: function(email, password) {
		return api.call({
			email: email,
			password: password
		}, '/users/auth', 'POST');
	}
};