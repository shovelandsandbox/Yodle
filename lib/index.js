var log = require('./commands/log.js');
var getLogs = require('./commands/getLogs.js');
var config = require('./config.js');

function Applesauce() {
}

Applesauce.prototype.log = log;
Applesauce.prototype.config = config;

var applesauce = module.exports = exports = new Applesauce;
