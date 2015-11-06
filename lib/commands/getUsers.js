module.exports = {
	name: 'getUsers',
	execute: function() {
		return this.api.call({}, '/projects/' + this.config.project + '/users', 'GET');
	}
};
