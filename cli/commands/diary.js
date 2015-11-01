module.exports = {
	name: 'diary',
	usage: 'new("diary name")',
	description: 'creates a new diary with the given name',
	alias: [
		'diary',
		'new'
	],
	execute: function(yodle, name) {
	  return yodle.new(name).then(function(json) {
    		return 'done';
	  });
	}
};
