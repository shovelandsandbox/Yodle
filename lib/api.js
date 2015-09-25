var Promise = require('promise');

module.exports = function(data, path, method) {
  return new Promise(function (_resolve, _reject) {
    data = JSON.stringify(data);

    var options = {
      hostname: global.applesauce.config.server,
      port: global.applesauce.config.port,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': global.applesauce.token,
        'Content-Length': data.length
      }
    };

    var http = require('http');

    var request = http.request(options, function (res) {;

      if (res.statusCode === 303) {

      }
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        _resolve(JSON.parse(chunk));
      });
      res.on('end', function () {
        _resolve();
      });
    });

    request.on('error', function (e) {
      console.log(e);
      _reject();
    });

    request.write(data);
    request.end();
  });
};
