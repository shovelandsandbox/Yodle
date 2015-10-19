var api = require('../api.js');

module.exports = {
	name: 'changeEmail',
	alias: [
		'changeEmail([.+])',
		'set email [.+]',
		'email [.+]'
	],
	api: function(email) {
	  return api.call({
	    email: email
	  }, '/users/me', 'PATCH')
	    .then(function(json) {
	      return json;
	    });
	}
};