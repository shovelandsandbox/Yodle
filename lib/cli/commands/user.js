var api = require('../../api.js');

module.exports = function(email, password) {
  return api.call({
    email: email,
    password: password
  }, '/users', 'POST')
    .then(function(json) {
      return json;
    });
};
