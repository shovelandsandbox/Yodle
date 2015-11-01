module.exports = {
  name: 'getDiaries',
  usage: 'list()',
  description: 'lists all diaries the signed in user has permission to see',
	alias: [
    'getDiaries',
    'list'
	],
	execute: function() {
  	return this.yodle.getDiaries().then(function(json) {
        var output = '';

        output += 'ID                       Name';

        for(var i in json) {
          output += '\n\r' + json[i]._id + ' ' + json[i].name;
        }

        return output;
    });
  }
};
