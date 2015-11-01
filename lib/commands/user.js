var api = require('../api.js');

module.exports = {
	name: 'user',
	usage: 'user("email", "password")',
	description: 'registers a user at the selected yodle server',
  alias: [
		'user'
  ],
  execute: function(email, password) {
	  return api.call({
	    email: email,
	    password: password
	  }, '/users', 'POST');
	}
};
