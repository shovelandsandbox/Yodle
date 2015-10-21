var api = require('../api.js');

module.exports = {
	name: 'user',
  alias: [
		'user'
  ],
  function(email, password) {
	  return api.call({
	    email: email,
	    password: password
	  }, '/users', 'POST')
	    .then(function(json) {
	      return json;
	    });
	}
};
