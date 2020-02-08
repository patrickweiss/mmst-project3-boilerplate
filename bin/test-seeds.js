const mongoose = require('mongoose');
const Test = require('../models/tests');

const dbName = 'diagram-logic';
mongoose.connect(`mongodb://localhost/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const tests = [
  {
    testName: 1,
    cases: ["5e2075a3d47a841ba8187bc2", "5e2089baec76e53438d8c1ca"],    //array of testCaseId
    complexity: "S"
  }
];



Test.create(tests, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${tests.length} tests`)
  mongoose.connection.close();
});
