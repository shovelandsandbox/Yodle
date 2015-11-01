module.exports = {
	name: 'addUser',
	execute: function(email) {
	  return this.api.call({
	    email: email
	  }, '/diaries/' + global.yodle.config.DIARY + '/users', 'POST');
	}
}