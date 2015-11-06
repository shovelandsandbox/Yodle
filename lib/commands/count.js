module.exports = {
	name: 'count',
	execute: function(query) {
		query = query ? query : {};

		return this.api.call(query, '/projects/' + this.config.project + '/entries?metaOnly=true', 'GET');
	}
};
