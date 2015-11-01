var Promise = require('promise');

module.exports = {
  name: 'port',
  usage: 'port(port)',
  description: 'connect to the specified port',
  alias: [
    'port'
  ],
  execute: function(port) {
	return new Promise(function (_resolve, _reject) {
		global.yodle.config.PORT = port;
		_resolve("Port set to " + port);
	});
  }
};