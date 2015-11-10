var Promise = require('promise'),
  debug = require('debug')('yodle');

module.exports = {
	name: 'live',
	execute: function(dataCallback, errorCallback) {
    if(!dataCallback) throw "Data callback requried";
    if(!errorCallback) throw "Error callback requried";

		return new Promise((_resolve, _reject) => {
			var url = this.config.server;
      if(this.config.protocol) url = this.config.protocol + '://' + url;
      if(this.config.port) url += ':' + this.config.port;

      debug('connecting live to ' + url);

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

        socket.on('unauthorized', function(err) {
          debug('unauthorized');
          errorCallback({status: 'unauthorized'});
        });

				socket.on('connect_error', function(err) {
					debug(err);
					socket.close();
					global.socketResolve("done");
				});

				socket.on('disconnect', function(data) {
					debug('socket disconnected!');
					socket.close();
					global.socketResolve("done");
				});

				socket.on('log', function (entry) {
					dataCallback(entry);
				});
			}
		});
	}
};
