var express = require('express'),
  router = express.Router(),
  config = require('../../config/config.js'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/users', router);
};

router.get('/', function (req, res, next) {
  User.find(function(err, users) {
    res.send(users);
  });
});

router.get('/:user', function (req, res, next) {
  var user = req.params["user"];

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
});

router.post('/', function (req, res, next) {
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
});


router.patch('/:user', function (req, res, next) {
  var user = req.params["user"];

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
});
