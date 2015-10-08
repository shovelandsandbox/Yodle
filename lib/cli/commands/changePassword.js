var api = require('../../api.js');

module.exports = function(password) {
  return api.call({
    password: password
  }, '/users/me', 'PATCH')
    .then(function(json) {
      return json;
    });
};
