'use strict';

var Promise = require('promise'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

class MongoDriver {}

MongoDriver.auth = function(email, password) {
  return new Promise((_resolve, _reject) => {
    User.findOne({
      email: email,
      password: password
    }, function(err, user) {
      if(user) {
        _resolve(user);
      } else {
        _reject(401, 'That didn\'t work out in your favor. Invalid user credentials!');
      }
    });
  });
};

MongoDriver.listUsers = function() {
  return new Promise((_resolve, _reject) => {
    User.find(function(err, users) {
      _resolve(users);
    });
  });
};

MongoDriver.getUser = function(user) {
  return new Promise((_resolve, _reject) => {
    User.findOne({
      _id: user
    }, {
      email: 1,
      password: 1
    }, function(err, user) {
      if(user) {
        _resolve(user);
      } else {
        _reject(404, 'Are you snooping? We couldn\'t find the user you\'re looking for.');
      }
    });
  });
};

MongoDriver.createUser = function(userData) {
  var user = new User();
  if(userData.email) user.email = userData.email;
  if(userData.password) user.password = userData.password;

  return new Promise((_resolve, _reject) => {
    user.save(function(err, data) {
      if(err) {
        _reject(500, 'Weird error to get here. Nothing should be going wrong...');
      } else {
        _resolve(user);
    }});
  });
};

MongoDriver.editUser = function(user, userData) {
  var data = {};
  if(userData.email) data.email = userData.email;
  if(userData.password) data.password = userData.password;

  return new Promise((_resolve, _reject) => {
    User.update({
      _id: user
    }, data, function(err, user) {
      if(data.ok) {
        if(data.nModified === 0) {
          var message = 'Are you snooping? We couldn\'t find the project you\'re looking for.';
          if(userId === 'me') message = 'Invalid user. Did you forget to sent an auth token in your header?';
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
