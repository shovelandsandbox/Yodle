function yodle() {}

require('./merge')(yodle, __dirname + '/lib/commands/*.js');

var yodle = module.exports = exports = new yodle();
