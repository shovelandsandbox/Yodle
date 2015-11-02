module.exports = {
	name: 'useProject',
	usage: 'use("projectId")',
	description: 'selects a project which contains the id, matching from the right of the complete id',
  alias: [
		'useProject',
		'project',
		'use'
  ],
  execute: function(name) {
	  return this.yodle.useProject(name).then(function(json) {
	    if(json.length) {
	      global.yodle.config.PROJECT = json[0]._id;
	      return 'project set to ' + global.yodle.config.PROJECT;
	    } else {
	      return 'error - project not found';
	    }
	  });
	}
};