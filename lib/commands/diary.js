var Promise = require('promise');
var api = require('../api.js');

module.exports = function() {
  return new Promise(function (_resolve, _reject) {
    api({}, '/diaries/', 'POST').then(_resolve(), _reject());
  });
};
