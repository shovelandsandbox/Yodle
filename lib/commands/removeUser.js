module.exports = {
	name: 'removeUser',
  execute: function(email) {
	  return this.api.call({user: email}, '/projects/' + this.config.project + '/users?user=' + email, 'DELETE');
	}
};
