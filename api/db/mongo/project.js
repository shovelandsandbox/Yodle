'use strict';

var Promise = require('promise'),
  mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  Entry = mongoose.model('Entry');

class MongoDriver {}

MongoDriver.getProjects = function(searchOptions) {
  searchOptions = searchOptions ? searchOptions : {};

  return new Promise((_resolve, _reject) => {
    var search = {
      users: searchOptions.user
    };

    if(searchOptions.name) search.$where = 'this._id.str.match(/' + searchOptions.name + '$/)';

    Project.find(search).lean().exec((err, projects) => {
      for(var i in projects) {
        projects[i]._id = projects[i]._id.toString();
      }

      _resolve(projects);
    });
  });
};

MongoDriver.getProject = function(project, searchOptions) {
  var project = project;
  var user = searchOptions.user;

  return new Promise((_resolve, _reject) => {
    Project.findOne({
      _id: project,
      users: user
    }, {
      entries: 1,
      users: 1
    }).lean().exec((err, project) => {
      if(project) {
        project._id = project._id.toString();
        _resolve(project);
      } else {
        _resolve(project);
      }
    });
  });
};

MongoDriver.createProject = function(projectData) {

  var project = new Project();

  project.users = projectData.users;
  project.entries = projectData.entries;
  project.name = projectData.name;

  return new Promise((_resolve, _reject) => {
    project.save((err, data) => {
      if(err) {
        _reject(err);
      } else {
        _resolve(project.id);
      }
    });
  });

};

MongoDriver.getProjectEntries = function(project, searchOptions, query) {
  var group = {_id: "$_id", count: {$sum: 1}};
  if(!searchOptions.metaOnly === true) group.entries = {$push: "$entries"};

  var search = {
    _id: mongoose.Types.ObjectId(project),
    users: searchOptions.user
  };
  for(var i in query) {
    search[i] = query[i];
  }

  return new Promise((_resolve, _reject) => {
    Project.aggregate()
      .unwind('entries')
      .match(search)
      .group(group)
      .project({
          _id : 0,
          count: 1,
          entries: 1
      })
      .exec(function(err, project) {
        if(project.length) {
          _resolve(project[0]);
        } else {
          _reject(err);
        }
      });
    });
};

MongoDriver.getProjectUsers = function(project, searchOptions) {
  return new Promise((_resolve, _reject) => {
    Project.findOne({
      _id: project,
      users: searchOptions.user
    }, {
    }, function(err, project) {
      if(project && project.users) {
        _resolve(project.users);
      } else {
        _reject();
      }
    });
  });
}

MongoDriver.addProjectUser = function(project, searchOptions, user) {
  return new Promise((_resolve, _reject) => {
    Project.update({
      _id: project,
      users: searchOptions.user
    },
    {
      $push: { users: user }
    },
    {
      update: true
    }, function(err, data) {
        if(data.ok) {
          if(data.nModified === 0) {
            _reject(404, 'Invalid project - not found.');
          } else if(data.nModified === 1) {
            _resolve();
          } else {
            _reject(500, 'Are you a wizard? You just updated more than one project with this entry.');
          }
        } else {
          var error = "Unknown error...";

          // TODO: Log this.... with yodle?!

          if((err.name === "CastError") && (err.path === '_id')) {
            error = "Invalid project id!";
          }
          _reject(500, error);
        }
    });
  });
};

MongoDriver.removeProjectUser = function(project, searchOptions, user) {
  return new Promise((_resolve, _reject) => {
    Project.update({
      _id: project,
      users: searchOptions.user
    },
    {
      $pull: { users: user }
    },
    {
      update: true
    }, function(err, data) {
        if(data.ok) {
          if(data.nModified === 0) {
            _reject(404, 'Invalid project or user - not found.');
          } else if(data.nModified === 1) {
            _resolve();
          } else {
            _reject(500, 'Are you a wizard? You just updated more than one project with this entry.');
          }
        } else {
          var error = "Unknown error...";

          // TODO: Log this.... with yodle?!

          if((err.name === "CastError") && (err.path === '_id')) {
            error = "Invalid project id!";
          }
          _reject(500, error);
        }
    });
  });
};

MongoDriver.getProjectEntry = function(project, searchOptions, entry) {
  return new Promise((_resolve, _reject) => {
    Project.findOne({
      _id: project,
      users: req.decoded.email
    }, {
      'entries': 1
    }, function(err, project) {
      if(project) {
        _resolve(project.entries);
      } else {
        _reject(404, 'That project is missing! Weird.');
      }
    });
  });
};

MongoDriver.createLog = function(project, log) {
  var entry = new Entry();

  entry.level = log.level;
  entry.message = log.message;
  entry.code = log.code;

  entry.ip = log.ip;

  var createMethod = {
    update: true
  };

  return new Promise((_resolve, _reject) => {
    Project.update(
      {
        _id: project
      },
      {
        $push: { entries: entry }
      },
      createMethod, function(err, data) {
        if(data.ok) {
          if(data.nModified === 0) {
            _reject(404, 'Invalid project - not found.');
          } else if(data.nModified === 1) {
            _resolve(entry);
          } else {
            _reject(500, 'Are you a wizard? You just updated more than one project with this entry.');
          }
        } else {
          var error = "Unknown error...";

          // TODO: Log this.... with yodle?!

          if((err.name === "CastError") && (err.path === '_id')) {
            error = "Invalid project id!";
          }
          _reject(500, error);
        }
      });
  });
};

module.exports = MongoDriver;
