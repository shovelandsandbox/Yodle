var express = require('express'),
  router = express.Router(),
  config = require('../../config/config.js'),
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  User = mongoose.model('User');

module.exports = {
  auth: auth,
  listUsers: listUsers,
  createUser: createUser,
  editUser: editUser,
  getUser: getUser
};

function auth(req, res) {
  User.findOne({
    email: req.swagger.params.credentials.value.email,
    password: req.swagger.params.credentials.value.password
  }, function(err, user) {
    if(user) {
      var token = jwt.sign(user, config.secret, {
        expiresInMinutes: 1440
      });
      res.send({
        token: token
      });
    } else {
      res.statusCode = 401;
      res.send({
        status: 401,
        message: 'That didn\'t work out in your favor. Invalid user credentials!'
      });
    }
  });
}

function listUsers(req, res) {
  User.find(function(err, users) {
    res.send(users);
  });
}

function getUser(req, res) {
  var userId = req.swagger.params.userId.value;

  var realUserId = userId === 'me' ? req.decoded._id : userId;

  User.findOne({
    _id: realUserId
  }, {
    email: 1,
    password: 1
  }, function(err, user) {
    if(user) {
      res.send(user);
    } else {
      res.statusCode = 404;
      res.send({
        status: 404,
        message: 'Are you snooping? We couldn\'t find the user you\'re looking for.'
      });
    }
  });
}

function createUser(req, res) {
  var user = new User();

  var data = {};
  if(req.swagger.params.user.value.email) user.email = req.swagger.params.user.value.email;
  if(req.swagger.params.user.value.password) user.password = req.swagger.params.user.value.password;

  user.save(function(err, data) {
    if(err) {
      res.statusCode = 500;
      res.send({
        status: 500,
        message: 'Weird error to get here. Nothing should be going wrong...'
      });
    } else {
      res.statusCode = 303;
      res.setHeader('Location', '/users/' + user.id);
      res.send({
        status: 303,
        message: 'User created!'
      });
    }});
}


function editUser(req, res) {
  var userId = req.swagger.params.userId.value;

  var realUserId = userId === 'me' ? req.decoded._id : userId;

  var data = {};
  if(req.swagger.params.user.value.email) data.email = req.swagger.params.user.value.email;
  if(req.swagger.params.user.value.password) data.password = req.swagger.params.user.value.password;

  if(data.email === req.decoded.email) {
    res.send({
      message: 'email is unchanged'
    });
    return;
  }
  if(data.password === req.decoded.password) {
    res.send({
      message: 'password is unchanged'
    });
    return;
  }


  if(!email.match(/.+@.+\..+/)) {
    res.send({
      message: 'no way is that email valid'
    });
    return;
  }


  User.update({
    _id: realUserId
  }, data, function(err, user) {
    if(data.ok) {
      if(data.nModified === 0) {
        res.statusCode = 404;

        var message = 'Are you snooping? We couldn\'t find the diary you\'re looking for.';
        if(userId === 'me') message = 'Invalid user. Did you forget to sent an auth token in your header?';

        res.send({
          status: 404,
          message: message
        });
      } else if(data.nModified === 1) {
        res.statusCode = 200;
        res.send({
          status: 200,
          message: "User Updated"
        });
      } else {
        res.statusCode = 500;
        res.send({
          status: 500,
          message: 'Are you a wizard? You just updated more than one user with this entry.'
        });
      }
    } else {
      var error = "Unknown error...";

      // TODO: Log this.... with applesauce?!
console.log(err);
      res.statusCode = 500;
      res.send({
        status: 500,
        message: error
      });
    }

    if(user) {
      res.send({
        status: 200,
        message: 'User Updated'
      });
    } else {
      res.statusCode = 404;
      res.send({
        status: 404,
        message: 'Are you snooping? We couldn\'t find the diary you\'re looking for.'
      });
    }
  });
}
