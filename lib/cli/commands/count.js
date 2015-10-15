var api = require('../../api.js');

module.exports = function(query) {
  query = query ? query : {};

  return api.call(query, '/diaries/' + global.applesauce.config.DIARY + '/entries?metaOnly=true', 'GET')
    .then(function(json) {
      var output = 'Logs: ' + json.count;

      return output;
    });
};
