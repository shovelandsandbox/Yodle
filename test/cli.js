var assert = require("assert");
var fs = require('fs');

var Cli = require("../lib/cli/index.js");
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
    it('should fail with -1, invalid port', function() {
      var config = cli.configure(['-p', 'invalid']);
      assert.equal(-1, config);
    });
  });
});

describe('Cli', function() {
  describe('#configure(n)', function() {
    it('should fail with -2, invalid mongo serger', function() {
      var config = cli.configure(['-m']);
      assert.equal(-2, config);
    });
  });
});

describe('Cli', function() {
  describe('#configure(n)', function() {
    it('should fail with -3, displaying help', function() {
      var config = cli.configure(['-?']);
      assert.equal(-3, config);
    });
  });
});

describe('Cli', function() {
  describe('#configure(n)', function() {
    it('should return defaults', function() {
      var config;

      config = cli.configure();
      assert.equal(null, config.HOST);
      assert.equal(null, config.PORT);
      assert.equal(null, config.DAEMON);
      assert.equal(null, config.DB);
      assert.equal(null, config.DIARY);
    });
  });
});

describe('Cli', function() {
	describe('#configure(n)', function() {
		it('test configuring everything', function() {
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

//describe('Cli', function() {
//	describe('#loadFromFile(n)', function() {
//		it('will load from file', function() {
//      fs.writeFile('/tmp/test', "success");
//
//      cli.loadFromFile('/tmp/test', function() {
//        assert.equal('success', global.applesauce.token);
//      });
//
//		});
//	});
//});

describe('Cli', function() {
	describe('#execute(executable, command, callback)', function() {
		it('fires off command on executable and calls callback', function() {
      var applesauce = {
        command: function() {
          return new Promise(function (_resolve, _reject) {
            _resolve();
          });
        }
      };

      cli.execute(applesauce, 'command()', function() {
        assert.equal(1, 1);
      });

		});
	});
});

describe('Cli', function() {
	describe('#turnOnPrompt(rl, callback, closedCallback)', function() {
		it('command - calls setPrompt, prompt and sets \'on\' and \'line\' events on rl, then calls callback', function() {
      var prompt = {
        setPrompt: function(value) {this.value = value;},
        prompt: function() {this.prompted = true;},
        close: function() {this.closed = true;},
        on: function(event, callback) {
          this[event] = callback;
          return this;
        }
      };

      cli.turnOnPrompt(prompt, function(command) {
        assert.equal('test', command);
        assert.equal('# ', prompt.value);
      }, function() {
        assert.equal(1, 1);
      });

      prompt.line('test');
		});
	});
});

describe('Cli', function() {
	describe('#turnOnPrompt(rl, callback, closedCallback)', function() {
		it('bye - calls setPrompt, prompt and sets \'on\' and \'line\' events on rl, then calls callback', function() {
      var rl = {
        setPrompt: function(value) {this.value = value;},
        prompt: function() {this.prompt = true;},
        close: function() {this.closed = true;},
        on: function(event, callback) {
          this[event] = callback;
          return this;
        }
      };

      cli.turnOnPrompt(rl, function(command) {
        assert.equal(1, 0);
      }, function() {
        assert.equal(1, 1);
      });

      rl.line('bye');
		});
	});
});

describe('Cli', function() {
	describe('#startCli(savePath, rl, applesauce, exit)', function() {
		it('emulate the main function', function() {
      var rl = {
        setPrompt: function(value) {this.value = value;},
        prompt: function() {this.prompted = true;},
        close: function() {this.closed = true;},
        on: function(event, callback) {
          this[event] = callback;
          return this;
        }
      };

      var applesauce = {
        endit: function() {
          return new Promise(function (_resolve, _reject) {
            assert.equal(1, 1);
          });
        }
      };

      cli.startCli(rl, applesauce, null);

      rl.line('endit()');
		});
	});
});
