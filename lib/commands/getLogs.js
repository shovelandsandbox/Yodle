var api = require('../api.js');

module.exports = {
  name: 'getLogs',
	alias: [
		'getLogs([.+])',
		'logs [.+]'
	],
	api: function(query) {
  		query = query ? query : {};

  		return api.call(query, '/diaries/' + global.applesauce.config.DIARY + '/entries', 'GET')
    		.then(function(json) {
      			var output = 'Logs:';
      
      			for(var i in json.entries) {
        			output += '\n\r[' + json.entries[i].ip + '] ' + json.entries[i].level + ' [' + json.entries[i].code + ']: ' + JSON.stringify(json.entries[i].message);
      			}

      			return output;
    		});
	}
};
