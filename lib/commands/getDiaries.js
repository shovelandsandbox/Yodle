var api = require('../api.js');

module.exports = {
  name: 'getDiaries',
  usage: 'list()',
  description: 'lists all diaries the signed in user has permission to see',
	alias: [
    'getDiaries',
    'list'
	],
	api: function() {
  	return api.call({}, '/diaries', 'GET');
  }
};
