function Applesauce() {}

var glob = require('glob');
var commands = glob.sync(__dirname + '/lib/commands/*.js');
var debug = require('debug')('applesauce');
	
Applesauce.prototype.commands = [];
Applesauce.prototype.execute = function(command, callback) {

	for(var i in this.commands) {
		var commandCheck = this.commands[i];

		for(var aliasI in commandCheck.alias) {
			var alias = commandCheck.alias[aliasI];

			alias += '(\\s?\\(?([^)]+)\\)?)?'

			var match = command.match(alias);

			if(match) {
				eval('commandCheck.api(' + match[1] + ')').then(callback, callback);
				
				return true;
			}
		}
	}
	return false;
};

commands.forEach(function (file) {
	debug('scanned ' + file);
	var command = require(file);

	Applesauce.prototype.commands.push(command);
  	Applesauce.prototype[command.name] = command.api;
});

var applesauce = module.exports = exports = new Applesauce();
