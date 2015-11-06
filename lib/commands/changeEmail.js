module.exports = {
	name: 'changeEmail',
	execute: function(email) {
	  return this.api.call({
	    email: email
	  }, '/users/me', 'PATCH');
	}
};
