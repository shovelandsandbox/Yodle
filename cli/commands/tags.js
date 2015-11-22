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

        output += 'Name\t\t\tCount';
        for(var i in json) {
          output += '\n\r' + json[i].tag + '\t\t\t' + json[i].count;
        }

        return output;
      });
  }
}
