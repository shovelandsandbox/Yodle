var assert = require("assert");

var Cli = require("../lib/cli.js");
var cli = new Cli();
describe('Cli', function() {
	describe('#isInt(n)', function() {
		it('should return true if n is an int', function() {
			assert.equal(true, cli.isInt(5));
			assert.equal(false, cli.isInt(0.4));
		});
	});
});
