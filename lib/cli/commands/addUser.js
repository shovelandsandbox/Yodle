var api = require('../../api.js');

module.exports = function(email) {
  return api.call({
    email: email
  }, '/diaries/' + global.applesauce.config.diary + '/users', 'POST')
    .then(function(json) {
      return json;
    });
};
