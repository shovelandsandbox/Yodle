var Promise = require('promise');

module.exports = function() {
  return new Promise(function (_resolve, _reject) {
    var data = JSON.stringify({

    });

    var options = {
      hostname: global.applesauce.config.server,
      port: global.applesauce.config.port,
      path: '/diaries/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': global.applesauce.token,
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