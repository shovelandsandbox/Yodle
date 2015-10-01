module.exports = function() {
  return new Promise(function (_resolve, _reject) {
    var fs = require('fs');

    fs.writeFile('config.json', JSON.stringify(global.applesauce.config), function(err) {
      _resolve("Done");
    });
  });
};
