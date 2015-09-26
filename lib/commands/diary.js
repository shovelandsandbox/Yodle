var Promise = require('promise');
var api = require('../api.js');

module.exports = function(name) {
  return new Promise(function (_resolve, _reject) {
    api({
      name: name
    }, '/diaries/', 'POST').then(_resolve(), _reject());
  });
};
