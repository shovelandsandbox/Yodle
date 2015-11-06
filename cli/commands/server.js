var Promise = require('promise');

module.exports = {
	name: 'server',
	usage: 'server("server")',
	description: 'specifies the yodle server to conenct to',
  	alias: [
		'server'
 	],
 	execute: function(server) {
		return new Promise(function (_resolve, _reject) {
			this.config.host = server;
			_resolve("Server set to " + server);
		}.bind(this));
	}
};
