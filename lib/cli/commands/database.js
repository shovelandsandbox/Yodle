var Promise = require('promise');

module.exports = {
	name: 'database',
	alias: [
		'database([.+])',
		'database [.+]',
		'db [.+]'
	],
	api: function(db) {
		return new Promise(function (_resolve, _reject) {
			global.applesauce.config.DB = db;
			_resolve("Database for daemon mode set to " + db);
		});
	}
};