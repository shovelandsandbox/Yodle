var api = require('../api.js');

module.exports = {
	name: 'getUsers',
	usage: 'users()',
	description: 'gets the users for the current diary',
	alias: [
		'getUsers',
		'users'
	],
	api: function() {
		return api.call({}, '/diaries/' + global.yodle.config.DIARY + '/users', 'GET');
	}
};
