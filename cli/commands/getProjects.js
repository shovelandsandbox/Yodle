module.exports = {
  name: 'getProjects',
  usage: 'list()',
  description: 'lists all projects the signed in user has permission to see',
	alias: [
    'getProjects',
    'projects',
    'list'
	],
	execute: function() {
  	return this.yodle.getProjects().then(function(json) {
        var output = '';

        output += 'ID\t\t\t Count\t\tName';

        for(var i in json) {
          output += '\n\r' + json[i]._id + ' ' + json[i].count + '\t\t' + json[i].name;
        }

        return output;
    });
  }
};
