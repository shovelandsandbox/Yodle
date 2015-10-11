var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'local';

var config = {
  local: {
    root: rootPath,
    app: {
      name: 'applesauce'
    },
    secret: 'nobodyknowsthis',
    port: (process.env.PORT || 3000),
    //db: 'tingodb:///tmp/applesauce'
    DB: (process.env.DB || 'mongodb://localhost/applesauce-development')
  },

  development: {
    root: rootPath,
    app: {
      name: 'applesauce'
    },
    secret: 'nobodyknowsthis',
    port: (process.env.PORT || 3000),
    DB: process.env.MONGOLAB_URI
  },

  test: {
    root: rootPath,
    app: {
      name: 'applesauce'
    },
    secret: 'nobodyknowsthis',
    port: 3000,
    DB: 'mongodb://localhost/applesauce-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'applesauce'
    },
    secret: 'nobodyknowsthis',
    port: 3000,
    DB: 'mongodb://localhost/applesauce-production'
  }
};

module.exports = config[env];
