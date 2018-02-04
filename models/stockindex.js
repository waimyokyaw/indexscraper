const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockIndexSchema = new Schema({
  indexId: String,
  netChange: String,
  indexName: String,
  indexValue: String,
  timeStamp : Number
});

module.exports.stockIndexSchema = stockIndexSchema;