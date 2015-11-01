module.exports = {
	name: 'useDiary',
	usage: 'use("diaryId")',
	description: 'selects a diary which contains the id, matching from the right of the complete id',
  alias: [
		'useDiary',
		'use'
  ],
  execute: function(name) {
	  return this.yodle.useDiary(name).then(function(json) {
	    if(json.length) {
	      global.yodle.config.DIARY = json[0]._id;
	      return 'diary set to ' + global.yodle.config.DIARY;
	    } else {
	      return 'error - diary not found';
	    }
	  });
	}
};