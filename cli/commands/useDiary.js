module.exports = {
	name: 'useDiary',
	usage: 'use("diaryId")',
	description: 'selects a diary which contains the id, matching from the right of the complete id',
  alias: [
		'useDiary',
		'use'
  ],
  execute: function(applesauce, name) {
	  return applesauce.then(function(json) {
	    if(json.length) {
	      global.applesauce.config.DIARY = json[0]._id;
	      return 'diary set to ' + global.applesauce.config.DIARY;
	    } else {
	      return 'error - diary not found';
	    }
	  });
	}
};