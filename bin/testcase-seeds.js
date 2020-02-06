const mongoose = require('mongoose');
const Testcase = require('../models/testCases');

const dbName = 'diagram-logic';
mongoose.connect(`mongodb://localhost/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const testcases = [
  {
    /*catOps: [{catName: "A", opName: "OR"}, {catName: "B", opName: "OR"}],
    complexity: "XS",
    line1: {arg1: "800000", arg2: "400000", result: "C00000"},
    line2: {arg1: "200000", arg2: "100000", result: "300000"},
    line3: {arg1: "080000", arg2: "040000", result: "0C0000"}
    */
   
    catOps: [{catName: "A", opName: "NAND"}, {catName: "C", opName: "XOR"}, {catName: "D", opName: "NOR"}],
    complexity: "S",
    line1: {arg1: "00D800", arg2: "20C000", result: "201000"},
    line2: {arg1: "203000", arg2: "201000", result: "002800"},
    line3: {arg1: "20F000", arg2: "00B800", result: "204000"}
    
  }  
];

Testcase.create(testcases, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${testcases.length} testcases`)
  mongoose.connection.close();
});
