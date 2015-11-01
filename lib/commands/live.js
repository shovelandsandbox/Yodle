var Promise = require('promise'),
  debug = require('debug')('yodle');

module.exports = {
	name: 'live',
	execute: function(callback) {
		if(!callback) throw "Exception requried";

		return new Promise(function (_resolve, _reject) {
			var url = global.config.HOST + ':' + global.config.PORT;

			global.socketResolve = _resolve;

			if(global.socket) {
				global.socket.connect();
			} else {
				global.socket = require('socket.io-client')(url);
				
				var socket = global.socket;

				socket.on('connect', function() {
					debug('socket connected!!');
				 	socket.emit('authenticate', {
				 		token: global.yodle.config.TOKEN,
				 		room: global.yodle.config.DIARY
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
		});
	}
};