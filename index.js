function Yodle(config, api) {
  this.config = config;
	var Api = api ? api : require('./lib/api');
  this.api = new Api(config);
}

require('./merge')(Yodle, __dirname + '/lib/commands/*.js');

var yodle = module.exports = exports = Yodle;
