module.exports = {
	name: 'addUser',
	usage: 'add("email")',
	description: 'adds a user by email to the current project',
	alias: [
		'addUser',
		'add'
	],
	execute: function(email) {
		return this.yodle.addUser(email);
	}
}