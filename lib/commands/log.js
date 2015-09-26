var Promise = require('promise');
var api = require('../api.js');

module.exports = function(level, message, code) {
  return new Promise(function (_resolve, _reject) {
    api({
      level: level,
      message: message,
      code: code
    }, '/diaries/' + global.applesauce.config.diary + '/entries', 'POST').then(function() {
      for(var i in json) {
        console.log(json[i]);
      }
      _resolve();
    }, _reject())
  });
};
