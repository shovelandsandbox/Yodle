var config = require('./config');

var addUser = require('./cli/commands/addUser');
var diary = require('./cli/commands/diary');
var getDiaries = require('./cli/commands/getDiaries');
var getLogs = require('./cli/commands/getLogs');
var log = require('./cli/commands/log');
var logIn = require('./cli/commands/login');
var useDiary = require('./cli/commands/useDiary');

function Applesauce() {
}

Applesauce.prototype.config = config;

Applesauce.prototype.addUser = addUser;
Applesauce.prototype.diary = diary;
Applesauce.prototype.getDiaries = getDiaries;
Applesauce.prototype.getLogs = getLogs;
Applesauce.prototype.log = log;
Applesauce.prototype.login = logIn;
Applesauce.prototype.useDiary = useDiary;

var applesauce = module.exports = exports = new Applesauce();
