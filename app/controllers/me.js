var express = require('express'),
  router = express.Router(),
  config = require('../../config/config.js'),
  mongoose = require('mongoose'),
  User = mongoose.model('Diary');

module.exports = function (app) {
  app.use('/me', router);
};

router.get('/', function (req, res, next) {
  var name = req.query.search;

  var search = {
    email: req.decoded.email
  };
  
  User.findOne(search, function(err, user) {
    res.send(user);
  });
});

router.post('/me', function (req, res, next) {
  var email = req.body.email;

  User.update({
    users: req.decoded.email
  },
  {
    $push: { email: email }
  },
  {
    update: true
  }, function(err, data) {
      if(data.ok) {
        if(data.nModified === 0) {
          res.statusCode = 404;
          res.send({
            status: 404,
            message: 'Invalid user. Did you forget to sent an auth token in your header?'
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

        res.statusCode = 500;
        res.send({
          status: 500,
          message: error
        });
      }
  });
});
