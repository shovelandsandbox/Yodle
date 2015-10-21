
var Promise = require('promise');

module.exports = {
	name: 'server',
  alias: [
		'server'
  ],
  function(server) {
		return new Promise(function (_resolve, _reject) {
			global.applesauce.config.HOST = server;
			_resolve("Server set to " + server);
		});
	}
};