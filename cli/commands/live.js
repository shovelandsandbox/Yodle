var Promise = require('promise'),
  debug = require('debug')('applesauce');

module.exports = {
	name: 'live',
	usage: 'live()',
	description: 'watches current diary live',
	alias: [
		'live'
	],
	execute: function(applesauce, callback) {
		var callback = function(entry) {
	      	// TODO make util for this
	      	console.log(entry.ip + ": " + entry.level + ' [' + entry.code + '] - ' + JSON.stringify(entry.message));
		};

		console.log("listening...");

		return applesauce.live(callback);
	}
};