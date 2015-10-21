var api = require('../api.js');

module.exports = {
	name: 'useDiary',
  alias: [
		'userDiary'
  ],
  function(name) {
	  return api.call({}, '/diaries/?' + 'search=' + name, 'GET').then(function(json) {
	    if(json.length) {
	      global.applesauce.config.DIARY = json[0]._id;
	      return 'diary set to ' + global.applesauce.config.DIARY;
	    } else {
	      return 'error - diary not found';
	    }
	  });
	}
};