var Promise = require('promise');
var api = require('../api.js');

module.exports = function(name) {
  return new Promise(function (_resolve, _reject) {
    api.call({
      name: name
    }, '/diaries/', 'GET').then(_resolve(), _reject());
  });
};
