const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var indexInfoSchema = new Schema({
  indexId: String,
  netChange: String,
  indexName: String,
  indexValue: String,
  timeStamp : Number
});

module.exports.indexInfoSchema = indexInfoSchema;