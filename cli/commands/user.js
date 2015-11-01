module.exports = {
	name: 'user',
	usage: 'user("email", "password")',
	description: 'registers a user at the selected yodle server',
  alias: [
		'user'
  ],
  execute: function(yodle, email, password) {
	  return yodle.user(email, password).then(function(json) {
	      return json;
	    });
	}
};
