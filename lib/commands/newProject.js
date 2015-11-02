module.exports = {
	name: 'newProject',
	execute: function(name) {
	  return this.api.call({
	    	name: name
	    }, '/projects/', 'POST');
	}
};
