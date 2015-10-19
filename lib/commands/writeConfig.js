var Promise = require('promise');

module.exports = {
  name: 'writeConfig',
  alias: [
    'writeConfig()',
    'save'
  ],
  function() {
    return new Promise(function (_resolve, _reject) {
      var fs = require('fs');

      var file;
      if(global.applesauce.configFile) {
        file = global.applesauce.configFile;

        var pathTo = file.split('/config.json')[0];

        if(!fs.existsSync(pathTo)) fs.mkdirSync(pathTo);
      } else {
        file = './config.json';
      }

      fs.writeFile(file, JSON.stringify(global.applesauce.config), function(err) {
        _resolve("Done");
      });
    });
  }
};