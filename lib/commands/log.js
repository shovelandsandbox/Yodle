var config = require('./../config.js')();
var Promise = require('promise');

module.exports = function(level, message, code) {
  return new Promise(function (_resolve, _reject) {
    var data = JSON.stringify({
      level: level,
      message: message,
      code: code
    });

    var options = {
      hostname: config.server,
      port: config.port,
      path: '/diaries/' + config.diary + '/entries',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': global.token,
        'Content-Length': data.length
      }
    };

    var http = require('http');

    var request = http.request(options, function (res) {
      if (res.statusCode === 303) {

      }
      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        //console.log('BODY: ' + chunk);
        _resolve(chunk);
      });
      res.on('end', function () {
        console.log('No more data in response.')
        _resolve();
      });
    });

    request.on('error', function (e) {
      //console.log('problem with request: ' + e.message);
      _reject();
    });

    request.write(data);
    request.end();
  });
};
