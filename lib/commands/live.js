var Promise = require('promise'),
  debug = require('debug')('applesauce');

module.exports = {
	name: 'live',
	alias: [
		'live'
	],
	api: function(callback) {
		if(!callback) callback = function(entry) {
	      	// TODO make util for this
	      	console.log(entry.ip + ": " + entry.level + ' [' + entry.code + '] - ' + JSON.stringify(entry.message));
		};

		return new Promise(function (_resolve, _reject) {
			var url = 'http://localhost';

			url += ':10010';

			global.socketResolve = _resolve;

			if(global.socket) {
				global.socket.connect();
			} else {
				global.socket = require('socket.io-client')(url);
				
				var socket = global.socket;

				socket.on('connect', function() {
					debug('socket connected!!');
				 	socket.emit('authenticate', {
				 		token: global.applesauce.config.TOKEN,
				 		room: global.applesauce.config.DIARY
				 	});
				});

				socket.on('error', function(err) {
					debug(err);
				});

				socket.on('disconnect', function(data) {
					debug('socket disconnected');
					debug(data);
					socket.close();
					global.socketResolve("done");
				});

				socket.on('log', function (entry) {
					callback(entry);
				});
			}

			console.log("listening...");
		});
	}
};