var Promise = require('promise'),
  debug = require('debug')('applesauce');

module.exports = function() {
	return new Promise(function (_resolve, _reject) {
		var url = 'http://localhost';

		url += ':10010';

		var socket = require('socket.io-client')(url);

		socket.on('connect', function() {
			debug('socket connected!!');
		 	socket.emit('authenticate', {
		 		token: global.applesauce.config.TOKEN,
		 		room: global.applesauce.config.DIARY
		 	});
		});

		socket.on('disconnect', function(data) {
			debug('socket disconnected');
			debug(data);
			socket.close();
		});

		socket.on('log', function (entry) {
          	// TODO make util for this
          	console.log(entry.ip + ": " + entry.level + ' [' + entry.code + '] - ' + JSON.stringify(entry.message));
		});

		console.log("listening...");
	});
};