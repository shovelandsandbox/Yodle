var Promise = require('promise');

module.exports = {
	name: 'database',
	usage: 'db("db connect string")',
	description: 'the connect string to the mongodb you want to use',
	alias: [
		'database',
		'db'
	],
	api: function(db) {
		return new Promise(function (_resolve, _reject) {
			global.applesauce.config.DB = db;
			_resolve("Database for daemon mode set to " + db);
		});
	}
};