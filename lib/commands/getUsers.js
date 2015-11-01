module.exports = {
	name: 'getUsers',
	execute: function() {
		return this.api.call({}, '/diaries/' + global.yodle.config.DIARY + '/users', 'GET');
	}
};
