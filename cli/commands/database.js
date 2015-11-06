var Promise = require('promise');

module.exports = {
	name: 'database',
	usage: 'db("db connect string")',
	description: 'the connect string to the mongodb you want to use',
	alias: [
		'database',
		'db'
	],
	execute: function(db) {
		return new Promise(function (_resolve, _reject) {
			this.config.db = db;
			_resolve("Database for daemon mode set to " + db);
		}.bind(this));
	}
};
