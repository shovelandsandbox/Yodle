var Promise = require('promise');

module.exports = {
  name: 'port',
  alias: [
    'port([.+])',
    'port [.+]'
  ],
  function(port) {
	return new Promise(function (_resolve, _reject) {
		global.applesauce.config.PORT = port;
		_resolve("Port set to " + port);
	});
  }
};