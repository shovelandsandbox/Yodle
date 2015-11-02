module.exports = {
	name: 'changePassword',
	usage: 'password("new password")',
	description: 'changes your password',
	alias: [
		'changePassword',
		'set\spassword',
		'password'
	],
	execute: function(password) {
		return this.yodle.changePassword(password);
	}
};