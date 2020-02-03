const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testCaseSchema = new Schema({
  catOps: [{catName: String, opName: String}],
  complexity: String,
  line1: {arg1: String, arg2: String, result: String},  //hexadecimal strings of length 6
  line2: {arg1: String, arg2: String, result: String},
  line3: {arg1: String, arg2: String, result: String},
}, {
  timestamps: true
});

const TestCase = mongoose.model("TestCase", testCaseSchema);
module.exports = TestCase;
