var Promise = require('promise'),
  debug = require('debug')('yodle');

module.exports = {
	name: 'live',
	usage: 'live()',
	description: 'watches current project live',
	alias: [
		'live'
	],
	execute: function(callback) {
		var callback = function(entry) {
	      	// TODO make util for this
	      	console.log(entry.ip + ": " + entry.level + ' [' + entry.code + '] - ' + JSON.stringify(entry.message));
		};

		console.log("listening...");

		return this.yodle.live(callback, function(error) {
      console.log(error);
    });
	}
};
