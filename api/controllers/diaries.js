var express = require('express'),
  router = express.Router(),
  config = require('../../config/config.js'),
  mongoose = require('mongoose'),
  Diary = mongoose.model('Diary'),
  Entry = mongoose.model('Entry');

module.exports = {
  addDiaryUser: addDiaryUser,
  createDiary: createDiary,
  createLog: createLog,
  getDiaries: getDiaries,
  getDiary: getDiary,
  getDiaryEntries: getDiaryEntries,
  getDiaryEntry: getDiaryEntry,
  getDiaryUsers: getDiaryUsers,
  removeDiaryUser: removeDiaryUser
};

function getDiaries(req, res, next) {
  var name = req.swagger.params.search.value;

  var search = {
    users: req.decoded.email
  };

  if(name) search.$where = 'this._id.str.match(/' + name + '$/)';

  Diary.find(search).lean().exec(function(err, diaries) {
    for(var i in diaries) {
      diaries[i]._id = diaries[i]._id.toString();
    }

    res.send(diaries);
  });
}

function getDiary(req, res, next) {
  var diary = req.swagger.params.diaryId.value;

  Diary.findOne({
    _id: diary,
    users: req.decoded.email
  }, {
    entries: 1,
    users: 1
  }).lean().exec(function(err, diary) {
    if(diary) {
      diary._id = diary._id.toString();
      res.send(diary);
    } else {
      res.statusCode = 404;
      res.send({
        status: 404,
        message: 'Are you snooping? We couldn\'t find the diary you\'re looking for.'
      });
    }
  });
}

function createDiary(req, res, next) {
  var diary = new Diary();

  diary.users = req.swagger.params.diary.value.users ? req.swagger.params.diary.value.users : [];
  diary.entries = req.swagger.params.diary.value.entries;
  diary.name = req.swagger.params.diary.value.name;
  
  if(diary.users.indexOf(req.decoded.email) === -1) diary.users.push(req.decoded.email);

  diary.save(function(err, data) {
    if(err) {
      res.statusCode = 500;
      res.send({
        status: 500,
        message: 'Weird error to get here. Nothing should be going wrong...'
      });
    } else {
      res.statusCode = 303;
      res.setHeader('Location', '/diaries/' + diary.id);
      res.send({
          status: 303
      });
    }});
}

function getDiaryEntries(req, res, next) {
  var diary = req.swagger.params.diaryId.value;

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
}

function getDiaryUsers (req, res, next) {
  var diary = req.swagger.params.diaryId.value;

  Diary.findOne({
    _id: diary,
    users: req.decoded.email
  }, {
  }, function(err, diary) {
    if(diary && diary.users) {
      res.send(diary.users);
    } else {
      res.statusCode = 404;
      res.send({
        status: 404,
        message: 'Are you snooping? We couldn\'t find the diary you\'re looking for.'
      });
    }
  });
}

function addDiaryUser(req, res, next) {
  var diary = req.swagger.params.diaryId.value;
  var user = req.swagger.params.user.value.email;

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
}

function removeDiaryUser(req, res, next) {
  var diary = req.swagger.params.diaryId.value;
  var user = req.swagger.params.user.value;

  Diary.update({
    _id: diary,
    users: req.decoded.email
  },
  {
    $pull: { users: user }
  },
  {
    update: true
  }, function(err, data) {
      if(data.ok) {
        if(data.nModified === 0) {
          res.statusCode = 404;
          res.send({
            status: 404,
            message: 'Invalid diary or user - not found.'
          });
        } else if(data.nModified === 1) {
          res.statusCode = 200;
          res.send({
            status: 200,
            message: "User removed"
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
}

function getDiaryEntry(req, res, next) {
  var diary = req.swagger.params.diaryId.value;
  var entry = req.swagger.params.entryId.value;

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
}

function createLog(req, res, next) {
  var diary = req.swagger.params.diaryId.value;

  var entry = new Entry();
  entry.level = req.swagger.params.entry.value.level;
  entry.message = req.swagger.params.entry.value.message;
  entry.code = req.swagger.params.entry.value.code;
  entry.ip = req.connection.remoteAddress;

  var createMethod = {
    update: true
  };

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
          // TODO make util for this
          console.log(entry.ip + ": " + entry.level + ' [' + entry.code + '] - ' + JSON.stringify(entry.message));
          global.io.to(diary).emit('log', entry);
          res.statusCode = 303;
          res.setHeader('Location', '/diaries/' + diary + '/entries' + entry.id);
          res.send({
              status: 303
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
}