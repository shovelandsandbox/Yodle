module.exports = {
	name: 'changeEmail',
	usage: 'email("email")',
	description: 'changes your email to some email',
	alias: [
		'changeEmail',
		'set\semail',
		'email'
	],
	execute: function(applesauce, email) {
	  return applesauce.setEmail(email);
	}
};