var config = require('./config.js')();

module.exports = function() {
  var options = {
    hostname: config.server,
    port: config.port,
    path: '/diaries/' + config.diary + '/entries',
    method: 'GET',
    headers: {
    }
  };

  var http = require('http');

  var request = http.request(options, function(res) {
    if(res.statusCode === 303) {

    }
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      var json = JSON.parse(chunk);
      for(var i in json) {
        console.log(json[i]);
      }
    });
    res.on('end', function() {
      //console.log('No more data in response.')
    });
  });

  request.on('error', function(e) {
    //console.log('problem with request: ' + e.message);
  });

  return request.end();
};
