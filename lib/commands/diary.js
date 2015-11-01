module.exports = {
	name: 'diary',
	execute: function(name) {
	  return this.api.call({
	    	name: name
	    }, '/diaries/', 'POST');
	}
};
