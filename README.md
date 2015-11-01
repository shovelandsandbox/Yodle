# Yodle [![Build Status](https://travis-ci.org/shovelandsandbox/yodle.svg)](https://travis-ci.org/shovelandsandbox/yodle) [![Code Climate](https://codeclimate.com/github/shovelandsandbox/yodle/badges/gpa.svg)](https://codeclimate.com/github/shovelandsandbox/yodle) [![Test Coverage](https://codeclimate.com/github/shovelandsandbox/yodle/badges/coverage.svg)](https://codeclimate.com/github/shovelandsandbox/applesauce/coverage) [![bitHound Score](https://www.bithound.io/github/shovelandsandbox/yodle/badges/score.svg)](https://www.bithound.io/github/shovelandsandbox/yodle)

Easy logging for your node applications! You just have to master:

## Installing it
Right now the cloud portion of this is being worked on and the API locked down. To get started with what we have now:

```
git clone git@github.com:shovelandsandbox/yodle.git
cd yodle
npm link
```

and that's it! Installed. If you want to actually use it you can open a terminal and try:

## Running it
```
yodle -d -m mongodb://user:pass@server:port/db
```

Depending on the state of the code that should fire up the server and connect to the specified database. Unfortunately the embedded DB is broken right now so you need a mongo server. Before you can read your logs, though, you've got to try:

## Logging it
To use this in your code:
```javascript
var yodle = require('yodle');
yodle.log(level, message, code);
```

All three of the above pieces of data can be json. Do whatever you want with them. Put whatever you want into them. Later on they will be searchable and reportable! You'll probably also want to master:

## Command lining it
To use the CLI:
> yodle

For help:
> yodle --help

Some of the commands are:
```javascript
=============== Setup
# login(email, password)
# server(server)
# port(port)
# database(host)
# changeEmail(newEmail)
# changePassword(newPassword)
# writeConfig()
# user(email, password)

=============== Diary manipulation
# getDiaries()
# diary(name)
# useDiary(diaryId)
# addUser(email)
# removeUser(email)
# getUsers()

=============== Log functions
# log(level, message, code)
# getLogs(conditions)
# count(conditions)
# live()
```

That's it. It's pretty bad. Also it crashes a bunch so don't be scared. Right now the only way to view the logs is through the CLI (and you can't sort or search or limit anything) or directly in your mongoDB.

Thanks for checking us out! Have fun.
