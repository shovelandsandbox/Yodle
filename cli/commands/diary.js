module.exports = {
	name: 'diary',
	usage: 'new("diary name")',
	description: 'creates a new diary with the given name',
	alias: [
		'diary',
		'new'
	],
	execute: function(name) {
	  return this.yodle.diary(name).then(function(json) {
    		return 'done';
	  });
	}
};
