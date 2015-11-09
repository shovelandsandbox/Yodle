var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  Entry = mongoose.model('Entry'),
  mongoDriver = require('../db/mongoDriver');

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
  mongoDriver.getProjects({
    user: req.decoded.email,
    name: req.swagger.params.search.value,
  }).then((projects) => {
    res.send(projects);
  }, (err) => {
    // TODO: Log error
  });
}

function getProject(req, res, next) {
  var project = req.swagger.params.projectId.value;

  mongoDriver.getProject(project, {
    email: req.decoded.email
  }).then((project) => {
    res.send(project);
  }, () => {
      res.statusCode = 404;
      res.send({
        status: 404,
        message: 'Are you snooping? We couldn\'t find the project you\'re looking for.'
      });
  });
}

function createProject(req, res, next) {
  var project = {};

  project.users = req.swagger.params.project.value.users ? req.swagger.params.project.value.users : [];
  project.entries = req.swagger.params.project.value.entries;
  project.name = req.swagger.params.project.value.name;

  if(project.users.indexOf(req.decoded.email) === -1) project.users.push(req.decoded.email);

  mongoDriver.createProject(project).then((id) => {
    res.statusCode = 303;
    res.setHeader('Location', '/projects/' + project.id);
    res.send({
        status: 303
    });
  }, (err) => {
    res.statusCode = 500;
    res.send({
      status: 500,
      message: 'Weird error to get here. Nothing should be going wrong...'
    });
  });

}

function getProjectEntries(req, res, next) {
  var project = req.swagger.params.projectId.value;

  var query = {};
  var searchOptions = {
    user: req.decoded.email,
    metaOnly: false
  };
  for(var i in req.query) {
    if(i === 'metaOnly') {
      if(req.query[i] === 'true') searchOptions.metaOnly = true;
    } else query['entries.' + i] = req.query[i];
  }

  mongoDriver.getProjectEntries(project, searchOptions, query).then(
    (project) => {
      res.send(project);
    }, () => {
      res.statusCode = 404;
      res.send({
        status: 404,
        message: 'Are you snooping? We couldn\'t find the project you\'re looking for.'
      });
    });
}

function getProjectUsers (req, res, next) {
  var project = req.swagger.params.projectId.value;

  mongoDriver.getProjectUsers(project, {
    user: req.decoded.email
  }).then((users) => {
    res.send(users);
  }, () => {
    res.statusCode = 404;
    res.send({
      status: 404,
      message: 'Are you snooping? We couldn\'t find the project you\'re looking for.'
    });
  });
}

function addProjectUser(req, res, next) {
  var project = req.swagger.params.projectId.value;
  var searchOptions = {
    user: req.decoded.email
  };
  var user = req.swagger.params.user.value.email;

  mongoDriver.addProjectUser(project, searchOptions, user).then(() => {
    res.statusCode = 200;
    res.send({
      status: 200,
      message: "User added"
    });
  }, (code, message) => {
    res.statusCode = code;
    res.send({
      status: code,
      message: message
    });
  });
}

function removeProjectUser(req, res, next) {
  var project = req.swagger.params.projectId.value;
  var searchOptions = {
    user: req.decoded.email
  };
  var user = req.swagger.params.user.value;

  mongoDriver.removeProjectUser(project, searchOptions, user).then(() => {
    res.statusCode = 200;
    res.send({
      status: 200,
      message: "User removed"
    });
  }, (code, message) => {
    res.statusCode = code;
    res.send({
      status: code,
      message: message
    });
  });
}

function getProjectEntry(req, res, next) {
  var project = req.swagger.params.projectId.value;
  var entry = req.swagger.params.entryId.value;


  mongoDriver.getProjectEntry(project, {
    user: req.decoded.email
  }).then((entries) => {
    entries.forEach((subEntry) => {
      if(subEntry._id == entry) {
        res.send(subEntry);
      }
    });
  }, (error, message) => {
      res.statusCode = error;
      res.send({
        status: error,
        message: message
      });
  });
}

function createLog(req, res, next) {
  var project = req.swagger.params.projectId.value;

  var log = {
    level: req.swagger.params.entry.value.level,
    message: req.swagger.params.entry.value.message,
    code: req.swagger.params.entry.value.code,
    ip: req.connection.remoteAddress
  };

  mongoDriver.createLog(project, log).then((entry) => {
    // TODO make util for this
    console.log(entry.ip + ": " + entry.level + ' [' + entry.code + '] - ' + JSON.stringify(entry.message));
    global.io.to(project).emit('log', entry);
    res.statusCode = 303;
    res.setHeader('Location', '/projects/' + project + '/entries/' + entry.id);
    res.send({
        status: 303
    });
  }, (error, message) => {
    res.statusCode = error;
    res.send({
      status: error,
      message: message
    });
  });
}
