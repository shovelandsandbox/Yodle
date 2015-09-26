var Promise = require('promise');
var fs = require('fs');
var api = require('../api.js');

module.exports = function(email, password) {
  return new Promise(function (_resolve, _reject) {
    api({
      email: email,
      password: password
    }, '/users/auth', 'POST').then(function(chunk) {

      global.applesauce.token = chunk.token;
      fs.writeFile('/tmp/applesauceuser', chunk.token);
      _resolve();
      console.log(global.applesauce.token);

    }, _reject())
  });
};
