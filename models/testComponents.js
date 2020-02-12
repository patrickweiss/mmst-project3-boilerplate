const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testComponentSchema = new Schema({
  catName: String,
  opName: String,
  line1: {arg1: Number, arg2: Number, result: Number},  //hexadecimal digit
  line2: {arg1: Number, arg2: Number, result: Number},
  line3: {arg1: Number, arg2: Number, result: Number},
}, {
  timestamps: true
});

const TestComponent = mongoose.model("TestComponent", testComponentSchema);
module.exports = TestComponent;

