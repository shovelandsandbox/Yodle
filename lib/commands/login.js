module.exports = {
	name: 'login',
	execute: function(email, password) {
		return this.api.call({
			email: email,
			password: password
		}, '/users/auth', 'POST');
	}
};