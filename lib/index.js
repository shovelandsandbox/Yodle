function Applesauce() {
}

Applesauce.prototype.addUser = require('./cli/commands/addUser');
Applesauce.prototype.changeEmail = require('./cli/commands/changeEmail');
Applesauce.prototype.changePassword = require('./cli/commands/changePassword');
Applesauce.prototype.diary = require('./cli/commands/diary');
Applesauce.prototype.getDiaries = require('./cli/commands/getDiaries');
Applesauce.prototype.getLogs = require('./cli/commands/getLogs');
Applesauce.prototype.log = require('./cli/commands/log');
Applesauce.prototype.login = require('./cli/commands/login');
Applesauce.prototype.useDiary = require('./cli/commands/useDiary');
Applesauce.prototype.writeConfig = require('./cli/commands/writeConfig');

var applesauce = module.exports = exports = new Applesauce();
