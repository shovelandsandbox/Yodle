# Yodle [![Build Status](https://travis-ci.org/shovelandsandbox/yodle.svg)](https://travis-ci.org/shovelandsandbox/yodle) [![Test Coverage](https://codeclimate.com/github/shovelandsandbox/yodle/badges/coverage.svg)](https://codeclimate.com/github/shovelandsandbox/yodle/coverage) [![bitHound Score](https://www.bithound.io/github/shovelandsandbox/yodle/badges/score.svg)](https://www.bithound.io/github/shovelandsandbox/yodle)

Easy logging for your node applications! You just have to master:

## Basic Client Usage

> npm install yodle

```javascript
var yodle = require('yodle')({
  project: projectId,
  server: 'yodle.yetilogs.com'
});
yodle.log('log without tags or level');
yodle.log({
  tags: [ 'tag', 'tag2' ],
  message: 'log with tags and level,
  level: 'severe'
})
```

Level, message and code can all be json. Do whatever you want with them. Later on they will be searchable or used as tags! Also note the projectId; eventually http://www.yeti.com will have some GUI features for you to use to manage projects but for now you'll probably also want to master:

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
# openProject("5b")             // Open a project; if project ID is 563ce917a6d9a2a55166e5b5
                                // you can enter 'b5', '5b5', 'e5b5', etc and it will match
                                // the first project ID it finds that matches starting at the
                                // right of the ID
# live()                        // View logs for given project live
# writeConfig()                 // Saves server, port, logged in user and selected project

# help()                        // More commands live in here, check it out!
```

## Running a server

For command line server options:
> yodle --help

A fully configured server looks like this:
> yodle --daemon --port 3000 --mongo mongodb://mongoUrl/database

That's it. It's a little rough. Also it crashes a bunch so don't be scared. Right now the only way to view the logs is through the CLI (and you can't sort or search or limit anything) or directly in your mongo instance.

Don't count on security or uptime or reliability. This is in active development!

Finally, you can implement your own server or your own client if you want; we've documented the API here https://swaggerhub.com/api/manconeg/Yodle

Thanks for checking us out! Have fun.
