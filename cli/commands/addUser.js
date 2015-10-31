module.exports = {
	name: 'addUser',
	usage: 'add("email")',
	description: 'adds a user by email to the current diary',
	alias: [
		'addUser',
		'add'
	],
	execute: function(applesauce, email) {
		return applesauce.addUser(email);
	}
}