function Applesauce() {}

Applesauce.prototype.addUser = require('./cli/commands/addUser');
Applesauce.prototype.changeEmail = require('./cli/commands/changeEmail');
Applesauce.prototype.changePassword = require('./cli/commands/changePassword');
Applesauce.prototype.database = require('./cli/commands/database');
Applesauce.prototype.diary = require('./cli/commands/diary');
Applesauce.prototype.getDiaries = require('./cli/commands/getDiaries');
Applesauce.prototype.getLogs = require('./cli/commands/getLogs');
Applesauce.prototype.getUsers = require('./cli/commands/getUsers');
Applesauce.prototype.live = require('./cli/commands/live');
Applesauce.prototype.log = require('./cli/commands/log');
Applesauce.prototype.login = require('./cli/commands/login');
Applesauce.prototype.port = require('./cli/commands/port');
Applesauce.prototype.server = require('./cli/commands/server');
Applesauce.prototype.removeUser = require('./cli/commands/removeUser');
Applesauce.prototype.useDiary = require('./cli/commands/useDiary');
Applesauce.prototype.user = require('./cli/commands/user');
Applesauce.prototype.writeConfig = require('./cli/commands/writeConfig');

var applesauce = module.exports = exports = new Applesauce();
