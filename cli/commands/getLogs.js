module.exports = {
  name: 'getLogs',
  usage: 'logs(query)',
  description: 'gets the logs. duh. example query: logs({\'level\': \'severe\', \'code\': \'5000\'})',
	alias: [
		'getLogs',
		'logs'
	],
	execute: function(query) {
  		query = query ? query : {};

  		return this.yodle.getLogs(query).then(function(json) {
      			var output = 'Logs:';

      			for(var i in json.entries) {
        			output += '\n\r[' + json.entries[i].ip + '] ' + json.entries[i].level + ' [' + json.entries[i].code + ']: ' + JSON.stringify(json.entries[i].message);
      			}

      			return output;
    		});
	}
};
