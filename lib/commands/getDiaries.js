module.exports = {
  name: 'getDiaries',
	execute: function() {
  	return this.api.call({}, '/diaries', 'GET');
  }
};
