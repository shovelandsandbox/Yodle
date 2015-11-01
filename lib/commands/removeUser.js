module.exports = {
	name: 'removeUser',
  execute: function(email) {
	  return this.api.call({user: email}, '/diaries/' + global.yodle.config.DIARY + '/users?user=' + email, 'DELETE');
	}
};
