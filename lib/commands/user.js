module.exports = {
	name: 'user',
  execute: function(email, password) {
	  return this.api.call({
	    email: email,
	    password: password
	  }, '/users', 'POST');
	}
};
