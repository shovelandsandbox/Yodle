var Promise = require('promise');

module.exports = function(db) {
	return new Promise(function (_resolve, _reject) {
		global.applesauce.config.DB = db;
		_resolve("Database for daemon mode set to " + db);
	});
};