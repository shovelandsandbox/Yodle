var api = require('../../api.js');

module.exports = function(email) {
  return api.call({
    email: email
  }, '/diaries/' + global.applesauce.config.DIARY + '/users', 'POST')
    .then(function(json) {
      return json;
    });
};
