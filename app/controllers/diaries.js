var express = require('express'),
  router = express.Router(),
  config = require('../../config/config.js'),
  mongoose = require('mongoose'),
  Diary = mongoose.model('Diary'),
  Entry = mongoose.model('Entry');

module.exports = function (app) {
  app.use('/diaries', router);
};

router.get('/', function (req, res, next) {
  var name = req.query.search;

  var search = {
    users: req.decoded.email
  };

  if(name) search.$where = 'this._id.str.match(/' + name + '$/)';

  Diary.find(search, function(err, diaries) {
    res.send(diaries);
  });
});

router.get('/:diary', function (req, res, next) {
  var diary = req.params["diary"];

  Diary.findOne({
    _id: diary,
    users: req.decoded.email
  }, {
    entries: 1,
    users: 1
  }, function(err, diary) {
    if(diary) {
      res.send(diary);
    } else {
      res.statusCode = 404;
      res.send({
        status: 404,
        message: 'Are you snooping? We couldn\'t find the diary you\'re looking for.'
      });
    }
  });
});

router.get('/:diary/entries', function (req, res, next) {
  var diary = req.params["diary"];

  var search = {
    _id: mongoose.Types.ObjectId(diary),
    users: req.decoded.email
  };

  for(var i in req.query) {
    search[i] = req.query[i];
  }

  Diary.aggregate()
    .unwind('entries')
    .match(search)
    .group({_id: "$_id", entries: {$push: "$entries"}})
    .exec(function(err, diary) {
      if(diary.length) {
        res.send(diary[0].entries);
      } else {
        res.statusCode = 404;
        res.send({
          status: 404,
          message: 'Are you snooping? We couldn\'t find the diary you\'re looking for.'
        });
      }
    });
});

router.get('/:diary/users', function (req, res, next) {
  var diary = req.params["diary"];

  Diary.findOne({
    _id: diary,
    users: req.decoded.email
  }, {
    entries: 1
  }, function(err, diary) {
    if(diary) {
      res.send(diary.users);
    } else {
      res.statusCode = 404;
      res.send({
        status: 404,
        message: 'Are you snooping? We couldn\'t find the diary you\'re looking for.'
      });
    }
  });
});

router.post('/:diary/users', function (req, res, next) {
  var diary = req.params["diary"];
  var user = req.body.email;

  Diary.update({
    _id: diary,
    users: req.decoded.email
  },
  {
    $push: { users: user }
  },
  {
    update: true
  }, function(err, data) {
      if(data.ok) {
        if(data.nModified === 0) {
          res.statusCode = 404;
          res.send({
            status: 404,
            message: 'Invalid diary - not found.'
          });
        } else if(data.nModified === 1) {
          res.statusCode = 200;
          res.send({
            status: 200,
            message: "User added"
          });
        } else {
          res.statusCode = 500;
          res.send({
            status: 500,
            message: 'Are you a wizard? You just updated more than one diary with this entry.'
          });
        }
      } else {
        var error = "Unknown error...";

        // TODO: Log this.... with applesauce?!

        if((err.name === "CastError") && (err.path === '_id')) {
          error = "Invalid diary id!";
        }
        res.statusCode = 500;
        res.send({
          status: 500,
          message: error
        });
      }
  });
});

router.get('/:diary/entries/:entry', function (req, res, next) {
  var diary = req.params["diary"];
  var entry = req.params["entry"];

  Diary.findOne({
    _id: diary,
    users: req.decoded.email
  }, {
    'entries': 1
  }, function(err, diary) {
    if(diary) {
      diary.entries.forEach(function(subEntry) {
        if(subEntry._id == entry) {
          res.send(subEntry);
        }
      });

    } else {
      res.statusCode = 404;
      res.send({
        status: 404,
        message: 'That Diary is missing! Weird.'
      });
    }
  });
});

router.post('/', function (req, res, next) {
  var diary = new Diary();

  diary.users = req.body.users ? req.body.users : [];
  diary.entries = req.body.entries;
  diary.name = req.body.name;

  if(diary.users.indexOf(req.decoded.email) === -1) diary.users.push(req.decoded.email);

  diary.save(function(err, data) {
    if(err) {
      res.statusCode = 500;
      res.send({
        status: 500,
        message: 'Weird error to get here. Nothing should be going wrong...'
      });
    } else {
      res.writeHead(303, { 'Location': '/diaries/' + diary.id });
      res.end();
    }});
});

router.post('/:diary/entries', function (req, res, next) {
  var diary = req.params["diary"];

  var entry = new Entry();
  entry.level = req.body.level;
  entry.message = req.body.message;
  entry.code = req.body.code;
  entry.ip = req.connection.remoteAddress;

  var createMethod = {
    update: true
  };

  console.log(entry.ip + ": " + entry.level + ' [' + entry.code + '] - ' + JSON.stringify(entry.message) + '\n\r');

  Diary.update(
    {
      _id: diary,
      users: req.decoded.email
    },
    {
      $push: { entries: entry }
    },
    createMethod, function(err, data) {
      if(data.ok) {
        if(data.nModified === 0) {
          res.statusCode = 404;
          res.send({
            status: 404,
            message: 'Invalid diary - not found.'
          });
        } else if(data.nModified === 1) {
          res.writeHead(303, { 'Location': '/diaries/' + diary + '/entries/' + entry.id });
          res.end();
        } else {
          res.statusCode = 500;
          res.send({
            status: 500,
            message: 'Are you a wizard? You just updated more than one diary with this entry.'
          });
        }
      } else {
        var error = "Unknown error...";

        // TODO: Log this.... with applesauce?!

        if((err.name === "CastError") && (err.path === '_id')) {
          error = "Invalid diary id!";
        }
        res.statusCode = 500;
        res.send({
          status: 500,
          message: error
        });
      }
    });
});
