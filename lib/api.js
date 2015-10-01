var querystring = require('querystring');

function Api() {}

Api.prototype.call = function(data, path, method) {
  return new Promise(function (_resolve, _reject) {
    var query = "";
    var postData = "";

    if(method === "GET") {
      query = querystring.stringify(data);
      if(query.length > 0) query = "?" + query;
    } else {
      postData = JSON.stringify(data);
    }

    var options = {
      hostname: global.applesauce.config.HOST ? global.applesauce.config.HOST : 'localhost',
      port: global.applesauce.config.PORT ? global.applesauce.config.PORT : 3000,
      path: path + query,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    if(global.applesauce.config.TOKEN) {
      options.headers['x-access-token'] = global.applesauce.config.TOKEN;
    }
    var http = require('http');

    var request = http.request(options, function (res) {
      var data = "";
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        if (res.statusCode !== 200 && res.statusCode !== 303) {
          console.log("status - " + res.statusCode);
          _reject(JSON.parse(data));
        } else {
          if(data) data = JSON.parse(data);
          _resolve(data);
        }
      });
    });

    request.on('error', function (e) {
      console.log("error");
      console.log(e);
      _reject();
    });

    request.write(postData);
    request.end();
  });
};

var applesauce = module.exports = exports = new Api();
