var Promise = require('promise');
var fs = require('fs');

module.exports = function(email, password) {
  return new Promise(function (_resolve, _reject) {
    var data = JSON.stringify({
      email: email,
      password: password
    });

    var options = {
      hostname: global.applesauce.config.server,
      port: global.applesauce.config.port,
      path: '/users/auth',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    var http = require('http');

    var request = http.request(options, function (res) {

      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        var json = JSON.parse(chunk);
        global.token = json.token;

        fs.writeFile('/tmp/applesauceuser', json.token);

        _resolve(chunk);
      });
      res.on('end', function () {
        console.log('No more data in response.')
        _resolve();
      });

      if(res.statusCode === 401) _reject();
    });

    request.on('error', function (e) {
      //console.log('problem with request: ' + e.message);
      _reject();
    });

    request.write(data);
    request.end();
  });
};
