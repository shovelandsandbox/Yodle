module.exports = {
	name: 'removeUser',
  execute: function(email) {
	  return this.api.call({user: email}, '/projects/' + global.yodle.config.PROJECT + '/users?user=' + email, 'DELETE');
	}
};
