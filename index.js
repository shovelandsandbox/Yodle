function Applesauce() {}

var glob = require('glob');
var models = glob.sync(__dirname + '/lib/commands/*.js');
	
models.forEach(function (file) {console.log(file);
	var command = require(file);
  	Applesauce.prototype[command.name] = command.api;
});

var applesauce = module.exports = exports = new Applesauce();
