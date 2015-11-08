var sqlize = require('sequelize');
var dbConfig = {
  database: config.get('database.database'),
  username: config.get('database.username'),
  password: config.get('database.password')
};

var Sequelize = new sqlize(dbConfig.database, dbConfig.username, dbConfig.password);
var User = Sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

Sequelize.sync();
