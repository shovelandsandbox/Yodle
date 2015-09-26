var Promise = require('promise');
var api = require('../api.js');

module.exports = function() {
  return new Promise(function (_resolve, _reject) {
    api({}, '/diaries/', 'GET').then(function(json) {
      console.log("ID                       Name");
      for(var i in json) {
        console.log(json[i]._id + " " + json[i].name);
      }
      _resolve();
    }, function() {
      _reject();
    });
  });
};
