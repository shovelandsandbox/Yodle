module.exports = {
	name: 'addUser',
	execute: function(email) {
	  return this.api.call({
	    email: email
	  }, '/projects/' + this.config.project + '/users', 'POST');
	}
}
