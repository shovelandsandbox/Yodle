var Promise = require('promise');

module.exports = {
	name: 'server',
	usage: 'server("server")',
	description: 'specifies the applesauce server to conenct to',
  	alias: [
		'server'
 	],
 	execute: function(server) {
		return new Promise(function (_resolve, _reject) {
			global.applesauce.config.HOST = server;
			_resolve("Server set to " + server);
		});
	}
};