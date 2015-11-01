module.exports = {
	name: 'changePassword',
	execute: function(password) {
		return this.api.call({
	    	password: password
	  	}, '/users/me', 'PATCH');
	}
};