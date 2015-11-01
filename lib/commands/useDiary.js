var api = require('../api.js');

module.exports = {
	name: 'useDiary',
	usage: 'use("diaryId")',
	description: 'selects a diary which contains the id, matching from the right of the complete id',
  alias: [
		'useDiary',
		'use'
  ],
  execute: function(name) {
	  return api.call({}, '/diaries/?' + 'search=' + name, 'GET');
	}
};