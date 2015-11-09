var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var projectSchema = new Schema({
  users: [ String ],
  name: String,
  entries: [ 'Entry' ]
});

projectSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Project', projectSchema);

