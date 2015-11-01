var Promise = require('promise'),
  debug = require('debug')('yodle');

module.exports = {
	name: 'live',
	usage: 'live()',
	description: 'watches current diary live',
	alias: [
		'live'
	],
	execute: function(yodle, callback) {
		var callback = function(entry) {
	      	// TODO make util for this
	      	console.log(entry.ip + ": " + entry.level + ' [' + entry.code + '] - ' + JSON.stringify(entry.message));
		};

		console.log("listening...");

		return yodle.live(callback);
	}
};