var Promise = require('promise');
var api = require('../api.js');

module.exports = function() {
  return new Promise(function (_resolve, _reject) {
    api({}, '/diaries/' + global.applesauce.config.diary + '/entries', 'GET').then(function(json) {
      for(var i in json) {
        console.log(json[i]);
      }
      _resolve();
    }, function() {
      _reject();
    });
  });
};
