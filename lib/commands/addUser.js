var api = require('../api.js');

module.exports = {
	name: 'addUser',
	alias: [
		'addUser([.+])',
		'add [.+]'
	],
	api: function(email) {
	  return api.call({
	    email: email
	  }, '/diaries/' + global.applesauce.config.DIARY + '/users', 'POST')
	    .then(function(json) {
	      return json;
	    });
	}
}