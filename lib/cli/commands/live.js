var Promise = require('promise');

module.exports = function() {
	return new Promise(function (_resolve, _reject) {
		var url = 'http://localhost:10010';

		var socket = require('socket.io-client')(url);
		socket.on('connect', function(){
		  socket.emit('authenticate', {token: global.applesauce.config.TOKEN});
		});

		socket.on('connection_error', function (data) {
			console.log("error");
			console.log(data);
		});

		socket.on('news', function (data) {
	    	console.log(data);
	    	socket.emit('my other event', { my: 'data' });
	  	});
		_resolve("done");
	});
};