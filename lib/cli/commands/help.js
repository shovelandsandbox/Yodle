var Promise = require('promise');

module.exports = function() {
  return new Promise(function (_resolve, _reject) {
    var output = '';
    output += '\n\r=============== Setup';
    output += '\n\r# login(email, password)';
    output += '\n\r# server(server)';
    output += '\n\r# port(port)';
    output += '\n\r# database(host)';
    output += '\n\r# changeEmail(newEmail)';
    output += '\n\r# changePassword(newPassword)';
    output += '\n\r# writeConfig()';
    output += '\n\r# user(email, password)';
    output += '\n\r';
    output += '\n\r=============== Diary manipulation';
    output += '\n\r# getDiaries()';
    output += '\n\r# diary(name)';
    output += '\n\r# useDiary(diaryId)';
    output += '\n\r# addUser(email)';
    output += '\n\r# removeUser(email)';
    output += '\n\r# getUsers()';
    output += '\n\r';
    output += '\n\r=============== Log functions';
    output += '\n\r# log(level, message, code)';
    output += '\n\r# getLogs(conditions)';
    output += '\n\r# count(conditions)';
    output += '\n\r# live()';

    _resolve(output);
  });
};
