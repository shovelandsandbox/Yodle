var addUser = require('./cli/commands/addUser');
var diary = require('./cli/commands/diary');
var getDiaries = require('./cli/commands/getDiaries');
var getLogs = require('./cli/commands/getLogs');
var log = require('./cli/commands/log');
var logIn = require('./cli/commands/login');
var useDiary = require('./cli/commands/useDiary');
var writeConfig = require('./cli/commands/writeConfig');

function Applesauce() {
}

Applesauce.prototype.addUser = addUser;
Applesauce.prototype.diary = diary;
Applesauce.prototype.getDiaries = getDiaries;
Applesauce.prototype.getLogs = getLogs;
Applesauce.prototype.log = log;
Applesauce.prototype.login = logIn;
Applesauce.prototype.useDiary = useDiary;
Applesauce.prototype.writeConfig = writeConfig;

var applesauce = module.exports = exports = new Applesauce();
