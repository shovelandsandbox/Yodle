function Yodle() {}

require('./merge')(Yodle, __dirname + '/lib/commands/*.js');

var yodle = module.exports = exports = Yodle;
