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
  var user = req.params.user;

  User.findOne({
    _id: user
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
        message: 'Are you snooping? We couldn\'t find the diary you\'re looking for.'
      });
    }
  });
}

function createUser(req, res) {
  var user = new User();

  var data = {};
  if(req.body.email) user.email = req.body.email;
  if(req.body.password) user.password = req.body.password;

  user.save(function(err, data) {
    if(err) {
      res.statusCode = 500;
      res.send({
        status: 500,
        message: 'Weird error to get here. Nothing should be going wrong...'
      });
    } else {
      res.writeHead(303, { 'Location': '/users/' + user.id });
      res.end();
    }});
}


function editUser(req, res) {
  var user = req.params.user;

  var data = {};
  if(req.body.email) data.email = req.body.email;
  if(req.body.password) data.password = req.body.password;

  User.update({
    _id: user
  }, data, function(err, user) {
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
