var fs = require('fs');

module.exports = {
	name: 'login',
	usage: 'login("email", "password")',
	description: 'log in as that user you like so much',
  alias: [
		'login'
  ],
  execute: function(email, password) {
	  return this.yodle.login(email, password).then(function(data) {

	      this.config.token = data.token;

	      return 'done';
	    }.bind(this));
	}
};
