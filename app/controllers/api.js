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
  Diary.find(function(err, diaries) {
    res.send(diaries);
  });
});

router.post('/', function (req, res, next) {
  var diary = new Diary();

  diary.save(diary, function(err, data) {
    if(err) {
      res.statusCode = 500;
      res.send({
        status: 500,
        message: 'Weird error to get here. Nothing should be going wrong...'
      });
    } else {
      res.writeHead(201, { 'Location': '/diary/' + diary.id });
      res.end();
    }});
});


router.get('/:diaries', function (req, res, next) {
  var diary = req.params["diary"];

  Diary.findOne({
    _id: diary
  }, {
    entries: 1
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

router.get('/:diaries/entries', function (req, res, next) {
  var diary = req.params["diary"];

  Diary.findOne({
    _id: diary
  }, {
    entries: 1
  }, function(err, diary) {
    if(diary) {
      res.send(diary.entries);
    } else {
      res.statusCode = 404;
      res.send({
        status: 404,
        message: 'Are you snooping? We couldn\'t find the diary you\'re looking for.'
      });
    }
  });
});

router.post('/:diary/entries', function (req, res, next) {
  var diary = req.params["diary"];

  var entry = new Entry();
  entry.level = req.body.level;
  entry.message = req.body.message;
  entry.code = req.body.code;

  var createMethod;
  if(config.autoCreateDiaries) {
    createMethod =  {
      insert: true
    };
  } else {
    createMethod =  {
      upsert: true
    };
  }

console.log(diary);

console.log(mongoose.Types.ObjectId.fromString);
  Diary.update(
    {
      _id: diary
    },
    {
      $push: { entries: entry }
    },
    createMethod, function(err, data) {
console.log(err);
console.log(data);

      if(data.ok) {
        if(data.nModified === 0) {
          res.statusCode = 400;
          res.send({
            status: 400,
            message: 'Invalid diary.'
          });
        } else if(data.nModified === 1) {
          res.writeHead(303, { 'Location': '/diary/' + diary + '/entry/' + entry.id });
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
