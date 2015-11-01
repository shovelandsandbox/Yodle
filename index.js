function Yodle(api) {
	this.api = api ? api : require('./lib/api');
}

require('./merge')(Yodle, __dirname + '/lib/commands/*.js');

var yodle = module.exports = exports = Yodle;
