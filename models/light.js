var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var lightSchema = new mongoose.Schema({
  value: String,
  date: Date
});

module.exports = mongoose.model('Light', lightSchema);