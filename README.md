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

### Getting started
```javascript
# register("email", "password") // Register a user on attached server
# login("email", "password")    // Login with a given user
# newProject("projectName")     // Create a new project
# listProjects()                // Display all projects
# openProject("5b")             // Open a project
# live()                        // View logs for given project live
# writeConfig()                 // Saves server, port, logged in user and selected project
```

## Running a server

For command line server options:
> yodle --help

A fully configured server looks like this:
> yodle --daemon --port 3000 --mongo mongodb://mongoUrl/database

That's it. It's a little rough. Also it crashes a bunch so don't be scared. Right now the only way to view the logs is through the CLI (and you can't sort or search or limit anything) or directly in your mongo instance.

Finally, you can implement your own server or your own client if you want; we've documented the API here https://swaggerhub.com/api/manconeg/Yodle

Thanks for checking us out! Have fun.
