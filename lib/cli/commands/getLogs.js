var api = require('../../api.js');

module.exports = function(query) {
  query = query ? query : {};

  return api.call(query, '/diaries/' + global.applesauce.config.DIARY + '/entries', 'GET')
    .then(function(json) {
      var output = 'Logs:';

      for(var i in json) {
        output += '\n\r[' + json[i].ip + '] ' + json[i].level + ' [' + json[i].code + '] :' + JSON.stringify(json[i].message);
      }

      return output;
    });
};
