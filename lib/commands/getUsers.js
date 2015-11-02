module.exports = {
	name: 'getUsers',
	execute: function() {
		return this.api.call({}, '/projects/' + global.yodle.config.PROJECT + '/users', 'GET');
	}
};
