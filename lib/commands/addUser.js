module.exports = {
	name: 'addUser',
	execute: function(email) {
	  return this.api.call({
	    email: email
	  }, '/projects/' + global.yodle.config.PROJECT + '/users', 'POST');
	}
}