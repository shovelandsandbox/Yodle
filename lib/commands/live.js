var Promise = require('promise'),
  debug = require('debug')('yodle');

module.exports = {
	name: 'live',
	execute: function(callback) {
		if(!callback) throw "Exception requried";

		return new Promise(function (_resolve, _reject) {
			var url = this.config.protocol + '://' + this.config.host + ':' + this.config.port;

			global.socketResolve = _resolve;

			if(global.socket) {
				global.socket.connect();
			} else {
				global.socket = require('socket.io-client')(url);

				var socket = global.socket;

				socket.on('connect', function() {
					debug('socket connected!!');
				 	socket.emit('authenticate', {
				 		token: this.config.token,
				 		room: this.config.project
				 	});
				}.bind(this));

				socket.on('error', function(err) {
					debug(err);
				});

				socket.on('connect_error', function(err) {
					debug(err);
					socket.close();
					global.socketResolve("done");
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
		}.bind(this));
	}
};
