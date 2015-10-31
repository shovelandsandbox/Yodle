var api = require('../api.js');

module.exports = {
  name: 'getLogs',
  usage: 'logs(query)',
  description: 'gets the logs. duh.',
	alias: [
		'getLogs',
		'logs'
	],
	api: function(query) {
  		query = query ? query : {};

  		return api.call(query, '/diaries/' + global.applesauce.config.DIARY + '/entries', 'GET');
	}
};
