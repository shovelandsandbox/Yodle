module.exports = {
	name: 'changePassword',
	usage: 'password("new password")',
	description: 'changes your password',
	alias: [
		'changePassword',
		'set\spassword',
		'password'
	],
	execute: function(applesauce, password) {
		return applesauce.setPassword(password);
	}
};