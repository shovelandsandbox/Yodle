module.exports = {
	name: 'changeEmail',
	usage: 'email("email")',
	description: 'changes your email to some email',
	alias: [
		'changeEmail',
		'set\semail',
		'email'
	],
	execute: function(yodle, email) {
	  return yodle.setEmail(email);
	}
};