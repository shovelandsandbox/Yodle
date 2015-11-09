'use strict';

var Promise = require('promise');

class PostgresDriver {}

MongoDriver.auth = function(email, password) {
  return new Promise((_resolve, _reject) => {
    /* Implement Me */
  });
};

MongoDriver.listUsers = function() {
  /* Process your input down here */
  return new Promise((_resolve, _reject) => {
    /* Long running functions go here */
  });
};

MongoDriver.getUser = function(user) {
  return new Promise((_resolve, _reject) => {
    /* Make sure to return a promise! */
  });
};

MongoDriver.createUser = function(userData) {
  var user = new User();
  if(userData.email) user.email = userData.email;
  if(userData.password) user.password = userData.password;

  return new Promise((_resolve, _reject) => {
    /* Implement Me */
    if(success) return _resolve(results);
    return _reject(404, message);
  });
};

MongoDriver.editUser = function(user, userData) {
  var data = {};
  if(userData.email) data.email = userData.email;
  if(userData.password) data.password = userData.password;

  return new Promise((_resolve, _reject) => {
    /* Implement Me */
          _reject(404, message);
        } else if(data.nModified === 1) {
          _resolve();
        } else {
          _reject(500, 'Are you a wizard? You just updated more than one user with this entry.');
        }
      } else {
        var error = "Unknown error...";

        // TODO: Log this.... with yodle?!
        _reject(500, error);
      }
    });
  });
};

module.exports = MongoDriver;
