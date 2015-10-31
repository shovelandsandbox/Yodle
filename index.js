function Applesauce() {}

require('./merge')(Applesauce, __dirname + '/lib/commands/*.js');

var applesauce = module.exports = exports = new Applesauce();
