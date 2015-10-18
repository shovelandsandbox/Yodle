var Promise = require('promise');

module.exports = function(server) {
	return new Promise(function (_resolve, _reject) {
		global.applesauce.config.HOST = server;
		_resolve("Server set to " + server);
	});
};