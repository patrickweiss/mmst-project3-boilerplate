const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  testName: Number,
  cases: [{type: Schema.Types.ObjectId, 
            ref: "TestCase"}],    //array of testCaseId
  complexity: String

}, {
  timestamps: true
});

const Test = mongoose.model("Test", testSchema);
module.exports = Test;