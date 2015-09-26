var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DiarySchema = new Schema({
  users: [ String ],
  name: String,
  entries: [ 'Entry' ]
});

DiarySchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Diary', DiarySchema);

