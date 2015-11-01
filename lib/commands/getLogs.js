var api = require('../api.js');

module.exports = {
  name: 'getLogs',
  usage: 'logs(query)',
  description: 'gets the logs. duh.',
	alias: [
		'getLogs',
		'logs'
	],
	execute: function(query) {
  		query = query ? query : {};

  		return api.call(query, '/diaries/' + global.yodle.config.DIARY + '/entries', 'GET');
	}
};
