var api = require('../api.js');

module.exports = function(name) {
  return api.call({}, '/diaries/?' + 'search=' + name, 'GET').then(function(json) {
    if(json.length) {
      global.applesauce.config.diary = json[0]._id;
      return 'diary set to ' + global.applesauce.config.diary;
    } else {
      return 'error - diary not found';
    }
  });
};
