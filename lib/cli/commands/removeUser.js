var fs = require('fs');
var api = require('../../api.js');

module.exports = function(email) {
  return api.call({user: email}, '/diaries/' + global.applesauce.config.DIARY + '/users?user=' + email, 'DELETE')
    .then(function(data) {
      return data;
    });
};
