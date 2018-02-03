const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chartInfoSchema = new Schema({
  indexId: String,
  chartValue: String,
  timeStamp : Number
});

module.exports.chartInfoSchema = chartInfoSchema;