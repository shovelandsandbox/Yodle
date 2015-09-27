var api = require('../api.js');

module.exports = function(name) {
  return api.call({
      name: name
    }, '/diaries/', 'POST').then(function(json) {

    return 'done';
  });
};
