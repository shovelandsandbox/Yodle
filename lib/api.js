var Promise = require('promise');
var querystring = require('querystring');
var debug = require('debug')('yodle');

function Api(config) {
  this.config = config;
}

function getOptions(url, port) {
  var match;
  if (process.env.http_proxy != null) {
    match = process.env.http_proxy.match(/^(http:\/\/)?([^:\/]+)(:([0-9]+))?/i);
    if (match) {
      return {
        host: match[2], // no http
        port: (match[4] != null ? match[4] : 80),
        headers: {
          Host: url
        },
        path: 'http://' + url + ':' + port // http
      };
    }
  }
  return {
    host: url,
    port: port,
    path: '',
    headers: {}
  }
};

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

    var options = getOptions(this.config.server, this.config.port);

    options.path += path + query;
    options.method = method;
    options.headers['Content-Type'] = 'application/json';
    options.headers['Content-Length'] = postData.length;

    if(this.config.token) {
      options.headers['x-access-token'] = this.config.token;
    }

    var http = require('http');

    var request = http.request(options, function (res) {
      var data = "";
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        debug("transmission over");
        if (res.statusCode !== 200 && res.statusCode !== 303) {
          debug("failure " + res.statusCode);
          console.log(data);
          _reject(data);
        } else {
          if(data) data = JSON.parse(data);
          _resolve(data);
        }
      });

      debug("start http request with options");
      debug(options);
    });

    request.on('error', function (e) {
      debug("error");
      debug(e);
      _reject();
    });

    request.write(postData);
    request.end();
  }.bind(this));
};

var api = module.exports = exports = Api;
