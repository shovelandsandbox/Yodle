module.exports = {
	name: 'createProject',
	usage: 'new("project name")',
	description: 'creates a new project with the given name',
	alias: [
		'newProject',
		'project',
		'new'
	],
	execute: function(name) {
	  return this.yodle.newProject(name).then(function(json) {
    		return 'done';
	  });
	}
};
