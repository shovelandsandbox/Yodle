module.exports = exports = function(object, directory) {
	var glob = require('glob');
	var commands = glob.sync(directory);
	var debug = require('debug')('matcher');

	debug(__dirname + '/commands/*.js');

	object.prototype.commands = [];

	object.prototype.execute = function(command, callback) {
		debug(command);
		for(var i in this.commands) {
			var commandCheck = this.commands[i];

			for(var aliasI in commandCheck.alias) {
				var alias = commandCheck.alias[aliasI];

				alias += '(?![a-z])(\\s?\\(?([^)]+)\\)?)?'

				var match = command.match(alias);

				if(match) {
					debug('matched');
					debug(match);
					debug('this[' + commandCheck.name + '](' + match[1] + ')');
					eval('this[commandCheck.name](' + match[1] + ')').then(callback, callback);
					
					return true;
				}
			}
		}
		return false;
	};

	commands.forEach(function (file) {
		debug('scanned ' + file);
		var command = require(file);

		object.prototype.commands.push(command);
	  	object.prototype[command.name] = command.execute;
	});
};
