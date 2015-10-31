module.exports = {
  name: 'getLogs',
  usage: 'logs(query)',
  description: 'gets the logs. duh.',
	alias: [
		'getLogs',
		'logs'
	],
	execute: function(applesauce, query) {
  		query = query ? query : {};

  		return applesauce.logs(query).then(function(json) {
      			var output = 'Logs:';
      
      			for(var i in json.entries) {
        			output += '\n\r[' + json.entries[i].ip + '] ' + json.entries[i].level + ' [' + json.entries[i].code + ']: ' + JSON.stringify(json.entries[i].message);
      			}

      			return output;
    		});
	}
};
