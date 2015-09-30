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

describe('Cli', function() {
  describe('#configure(n)', function() {
    it('should return defaults', function() {
      var config;

      config = cli.configure();
      assert.equal('192.168.1.1', config.HOST);
      assert.equal(3000, config.PORT);
      assert.equal(false, config.DAEMON);
      assert.equal('mongodb://localhost/applesauce-development', config.DB);
      assert.equal(null, config.DIARY);
    });
  });
});

describe('Cli', function() {
	describe('#configure(n)', function() {
		it('should return .daemon = true and .port = 500', function() {
      var config;

      config = cli.configure(['-d', '-p', '500', '-h', '192.168.1.5', '-l', '560859a03b3994ed25fe89ee', '-m', 'mongodb://otherhost/applesauce-development']);
			assert.equal(true, config.DAEMON);
      assert.equal('192.168.1.5', config.HOST);
			assert.equal(500, config.PORT);
			assert.equal('mongodb://otherhost/applesauce-development', config.DB);
			assert.equal('560859a03b3994ed25fe89ee', config.DIARY);
		});
	});
});
