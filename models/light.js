var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var lightSchema = new mongoose.Schema({
  lightLevel: String,
  date: Date,
  lightState: Number
});

module.exports = mongoose.model('Light', lightSchema);