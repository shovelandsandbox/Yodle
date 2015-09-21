var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EntrySchema = new Schema({
  level: String,
  message: String,
  code: String
});

EntrySchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Entry', EntrySchema);

