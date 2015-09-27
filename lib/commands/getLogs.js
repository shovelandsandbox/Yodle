var api = require('../api.js');

module.exports = function(query) {
  query = query ? query : {};

  return api.call(query, '/diaries/' + global.applesauce.config.diary + '/entries', 'GET')
    .then(function(json) {
      var output = '';

      for(var i in json) {
        output += json[i].level + ' [' + json[i].code + '] :' + JSON.stringify(json[i].message) + '\n\r';
      }

      return output;
    });
};
