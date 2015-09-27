var fs = require('fs');
var api = require('../api.js');

module.exports = function(email, password) {
  return api.call({
      email: email,
      password: password
    }, '/users/auth', 'POST')
    .then(function(chunk) {

      global.applesauce.token = chunk.token;
      fs.writeFile('/tmp/applesauceuser', chunk.token);
      console.log(global.applesauce.token);

      return 'done';
    });
};
