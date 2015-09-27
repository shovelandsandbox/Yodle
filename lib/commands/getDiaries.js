var api = require('../api.js');

module.exports = function() {
  return api.call({}, '/diaries/', 'GET')
    .then(function(json) {
      var output = '';

      output += 'ID                       Name\n\r';

      for(var i in json) {
        output += json[i]._id + ' ' + json[i].name + '\n\r';
      }

      return output;
  });
};
