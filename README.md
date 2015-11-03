# Yodle [![Build Status](https://travis-ci.org/shovelandsandbox/yodle.svg)](https://travis-ci.org/shovelandsandbox/yodle) [![Test Coverage](https://codeclimate.com/github/shovelandsandbox/yodle/badges/coverage.svg)](https://codeclimate.com/github/shovelandsandbox/yodle/coverage) [![bitHound Score](https://www.bithound.io/github/shovelandsandbox/yodle/badges/score.svg)](https://www.bithound.io/github/shovelandsandbox/yodle)

Easy logging for your node applications! You just have to master:

## Basic Client Usage

> npm install yodle

```javascript
var yodle = require('yodle')({
  project: projectId,
  server: 'yodle.yeti.com'
});
yodle.log(level, message, code);
```

Level, message and code can all be json. Do whatever you want with them. Later on they will be searchable or used as tags! You'll probably also want to master:

## Advanced Client Usage

> npm install yodle -g

and that's it! Installed. If you want to actually use it you can open a terminal and try:

> yodle

Some of the commands are:
```javascript
=============== General
# help()
# login(email, password)
# server(server)
# port(port)
# database(host)
# changeEmail(newEmail)
# changePassword(newPassword)
# writeConfig()
# user(email, password)

=============== project manipulation
# getProjects()
# project(name)
# useProject(projectId)
# addUser(email)
# removeUser(email)
# getUsers()

=============== Log functions
# log(level, message, code)
# getLogs(conditions)
# count(conditions)
# live()
```

## Running a server

For command line server options:
> yodle --help

That's it. It's pretty bad. Also it crashes a bunch so don't be scared. Right now the only way to view the logs is through the CLI (and you can't sort or search or limit anything) or directly in your mongoDB.

Thanks for checking us out! Have fun.
