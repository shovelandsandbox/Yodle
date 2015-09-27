var api = require('../api.js');

module.exports = function(level, message, code) {
  return api.call({
      level: level,
      message: message,
      code: code
    }, '/diaries/' + global.applesauce.config.diary + '/entries', 'POST')
    .then(function(json) {
      var output = '';

      for(var i in json) {
        output += json[i];
      }

      return output;
    });
};
