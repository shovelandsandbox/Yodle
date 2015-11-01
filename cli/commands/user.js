module.exports = {
	name: 'user',
	usage: 'user("email", "password")',
	description: 'registers a user at the selected yodle server',
  alias: [
		'user',
		'register'
  ],
  execute: function(email, password) {
	  return this.yodle.user(email, password).then(function(json) {
	      return json;
	    });
	}
};
