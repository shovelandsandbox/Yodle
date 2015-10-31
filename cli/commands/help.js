var Promise = require('promise');

module.exports = {
    name: 'help',
    usage: '?()',
    description: 'uhhh how else did you get here?',
    alias: [
        'help',
        '\\?'
    ],
    execute: function() {
        return new Promise(function (_resolve, _reject) {
            var output = '';
            output += '\n\r Commands: (paranthesis are optional. \'Eg: use("5b")\' is identical to \'use "5b"\'';

            var glob = require('glob');
            var commands = glob.sync(__dirname + '/*.js');

            var longestUsageLength = 0;
            commands.forEach(function (file) {
                var command = require(file);

                if(longestUsageLength < command.usage.length) longestUsageLength = command.usage.length;
            });

            commands.forEach(function (file) {
                var command = require(file);

                output += '\n\r';
                output += '\t';

                command.usage = ("                                          " + command.usage).slice(-longestUsageLength);

                output += command.usage;
                output += '\t';
                output += command.description;
            });
            
            _resolve(output);
            });
    }
};