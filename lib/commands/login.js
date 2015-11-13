module.exports = {
	name: 'login',
	execute: function(email, password) {
		return this.api.call({
			email: email,
			password: password
		}, '/users/auth', 'POST').then((token) => {
      this.config.token = token.token;
      this.api.config.token = token.token
      return token;
    });
	}
};
