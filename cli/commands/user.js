module.exports = {
	name: 'user',
	usage: 'user("email", "password")',
	description: 'registers a user at the selected applesauce server',
  alias: [
		'user'
  ],
  execute: function(applesauce, email, password) {
	  return applesauce.user(email, password).then(function(json) {
	      return json;
	    });
	}
};
