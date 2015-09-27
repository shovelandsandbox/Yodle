var assert = require("assert");

var Api = require("../lib/api");

describe('Api', function() {
	describe('#getOptions()', function() {
		it('should return -1 when the value is not present', function() {
      var api = new Api();
      api.getOptions();
			assert.equal(-1, [1, 2, 3].indexOf(5));
			assert.equal(-1, [1, 2, 3].indexOf(0));
		});
	});
});
