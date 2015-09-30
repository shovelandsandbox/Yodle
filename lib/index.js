var config = require('./config');
var diary = require('./commands/diary');
var getDiaries = require('./commands/getDiaries');
var getLogs = require('./commands/getLogs');
var log = require('./commands/log');
var logIn = require('./commands/logIn');
var useDiary = require('./commands/useDiary');

function Applesauce() {
}

Applesauce.prototype.config = config;

Applesauce.prototype.diary = diary;
Applesauce.prototype.getDiaries = getDiaries;
Applesauce.prototype.getLogs = getLogs;
Applesauce.prototype.log = log;
Applesauce.prototype.login = logIn;
Applesauce.prototype.useDiary = useDiary;

var applesauce = module.exports = exports = new Applesauce();
