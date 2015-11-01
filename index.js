function Yodle() {}

require('./merge')(Yodle, __dirname + '/lib/commands/*.js');

console.log(Yodle.prototype);

var yodle = module.exports = exports = Yodle;
