module.exports = {
  name: 'tags',
  usage: 'tags()',
  description: 'gets all of your tags with counts',
  alias: [
    'tags'
  ],
  execute: function() {
    return this.yodle.tags().then(function(json) {

        var output = '';

        output += 'Count\tName';
        for(var i in json) {
          output += '\n\r' + json[i].count + '\t' + json[i].tag;
        }

        return output;
      });
  }
}
