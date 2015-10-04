var api = require('../../api.js');

module.exports = function(email) {
  return api.call({
    email: email
  }, '/me', 'POST')
    .then(function(json) {
      return json;
    });
};
