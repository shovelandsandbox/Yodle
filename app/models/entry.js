var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EntrySchema = new Schema({
  level: String,
  message: Object,
  code: String,
  ip: String
});

EntrySchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Entry', EntrySchema);

