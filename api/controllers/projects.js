var express = require('express'),
  router = express.Router(),
  config = require('../../config/config.js'),
  mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  Entry = mongoose.model('Entry');

module.exports = {
  addProjectUser: addProjectUser,
  createProject: createProject,
  createLog: createLog,
  getProjects: getProjects,
  getProject: getProject,
  getProjectEntries: getProjectEntries,
  getProjectEntry: getProjectEntry,
  getProjectUsers: getProjectUsers,
  removeProjectUser: removeProjectUser
};

function getProjects(req, res, next) {
  var name = req.swagger.params.search.value;

  var search = {
    users: req.decoded.email
  };

  if(name) search.$where = 'this._id.str.match(/' + name + '$/)';

  Project.find(search).lean().exec(function(err, projects) {
    for(var i in projects) {
      projects[i]._id = projects[i]._id.toString();
    }

    res.send(projects);
  });
}

function getProject(req, res, next) {
  var project = req.swagger.params.projectId.value;

  Project.findOne({
    _id: project,
    users: req.decoded.email
  }, {
    entries: 1,
    users: 1
  }).lean().exec(function(err, project) {
    if(project) {
      project._id = project._id.toString();
      res.send(project);
    } else {
      res.statusCode = 404;
      res.send({
        status: 404,
        message: 'Are you snooping? We couldn\'t find the project you\'re looking for.'
      });
    }
  });
}

function createProject(req, res, next) {
  var project = new Project();

  project.users = req.swagger.params.project.value.users ? req.swagger.params.project.value.users : [];
  project.entries = req.swagger.params.project.value.entries;
  project.name = req.swagger.params.project.value.name;

  if(project.users.indexOf(req.decoded.email) === -1) project.users.push(req.decoded.email);

  project.save(function(err, data) {
    if(err) {
      res.statusCode = 500;
      res.send({
        status: 500,
        message: 'Weird error to get here. Nothing should be going wrong...'
      });
    } else {
      res.statusCode = 303;
      res.setHeader('Location', '/projects/' + project.id);
      res.send({
          status: 303
      });
    }});
}

function getProjectEntries(req, res, next) {
  var project = req.swagger.params.projectId.value;

  var search = {
    _id: mongoose.Types.ObjectId(project),
    users: req.decoded.email
  };

  var group = {_id: "$_id", count: {$sum: 1}};

  var metaOnly = false;
  for(var i in req.query) {
    if(i === 'metaOnly') {
      if(req.query[i] === 'true') metaOnly = true;
    } else search['entries.' + i] = req.query[i];
  }
  if(!metaOnly) group.entries = {$push: "$entries"};

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
        res.send(project[0]);
      } else {
        res.statusCode = 404;
        res.send({
          status: 404,
          message: 'Are you snooping? We couldn\'t find the project you\'re looking for.'
        });
      }
    });
}

function getProjectUsers (req, res, next) {
  var project = req.swagger.params.projectId.value;

  Project.findOne({
    _id: project,
    users: req.decoded.email
  }, {
  }, function(err, project) {
    if(project && project.users) {
      res.send(project.users);
    } else {
      res.statusCode = 404;
      res.send({
        status: 404,
        message: 'Are you snooping? We couldn\'t find the project you\'re looking for.'
      });
    }
  });
}

function addProjectUser(req, res, next) {
  var project = req.swagger.params.projectId.value;
  var user = req.swagger.params.user.value.email;

  Project.update({
    _id: project,
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
            message: 'Invalid project - not found.'
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
            message: 'Are you a wizard? You just updated more than one project with this entry.'
          });
        }
      } else {
        var error = "Unknown error...";

        // TODO: Log this.... with yodle?!

        if((err.name === "CastError") && (err.path === '_id')) {
          error = "Invalid project id!";
        }
        res.statusCode = 500;
        res.send({
          status: 500,
          message: error
        });
      }
  });
}

function removeProjectUser(req, res, next) {
  var project = req.swagger.params.projectId.value;
  var user = req.swagger.params.user.value;

  Project.update({
    _id: project,
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
            message: 'Invalid project or user - not found.'
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
            message: 'Are you a wizard? You just updated more than one project with this entry.'
          });
        }
      } else {
        var error = "Unknown error...";

        // TODO: Log this.... with yodle?!

        if((err.name === "CastError") && (err.path === '_id')) {
          error = "Invalid project id!";
        }
        res.statusCode = 500;
        res.send({
          status: 500,
          message: error
        });
      }
  });
}

function getProjectEntry(req, res, next) {
  var project = req.swagger.params.projectId.value;
  var entry = req.swagger.params.entryId.value;

  Project.findOne({
    _id: project,
    users: req.decoded.email
  }, {
    'entries': 1
  }, function(err, project) {
    if(project) {
      project.entries.forEach(function(subEntry) {
        if(subEntry._id == entry) {
          res.send(subEntry);
        }
      });

    } else {
      res.statusCode = 404;
      res.send({
        status: 404,
        message: 'That project is missing! Weird.'
      });
    }
  });
}

function createLog(req, res, next) {
  var project = req.swagger.params.projectId.value;

  var entry = new Entry();
  entry.level = req.swagger.params.entry.value.level;
  entry.message = req.swagger.params.entry.value.message;
  entry.code = req.swagger.params.entry.value.code;
  entry.ip = req.connection.remoteAddress;

  var createMethod = {
    update: true
  };

  Project.update(
    {
      _id: project,
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
            message: 'Invalid project - not found.'
          });
        } else if(data.nModified === 1) {
          // TODO make util for this
          console.log(entry.ip + ": " + entry.level + ' [' + entry.code + '] - ' + JSON.stringify(entry.message));
          global.io.to(project).emit('log', entry);
          res.statusCode = 303;
          res.setHeader('Location', '/projects/' + project + '/entries/' + entry.id);
          res.send({
              status: 303
          });
        } else {
          res.statusCode = 500;
          res.send({
            status: 500,
            message: 'Are you a wizard? You just updated more than one project with this entry.'
          });
        }
      } else {
        var error = "Unknown error...";

        // TODO: Log this.... with yodle?!

        if((err.name === "CastError") && (err.path === '_id')) {
          error = "Invalid project id!";
        }
        res.statusCode = 500;
        res.send({
          status: 500,
          message: error
        });
      }
    });
}
