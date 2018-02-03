const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var indexInfoSchema = new Schema({
  netChange: String,
  indexId: String,
  indexName: String,
  indexValue: String,
  timeStamp : Number
});

module.exports.indexInfoSchema = indexInfoSchema;