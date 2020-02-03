const numOfCycles = 1;  //number of generator cycles (INPUT)
                        //1 cycle = up to 30 components

const mongoose = require('mongoose');
const TestComponent = require('../models/testComponents');

const dbName = 'diagram-logic';
mongoose.connect(`mongodb://localhost/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//=====================================================
// module.exports = function cappuccino () {



const testComponent = {   
  catName: "",    
  opName: "",      
  line1: {arg1: 0, arg2: 0, result: 0},
  line2: {arg1: 0, arg2: 0, result: 0},
  line3: {arg1: 0, arg2: 0, result: 0}
};

let countComponents = 0; 

const categories = [
  {name: "A", desc: "Line"},
  {name: "B", desc: "Arc"},
  {name: "C", desc: "Dot"},
  {name: "D", desc: "Centric"},
  {name: "E", desc: "Arrow"},
  {name: "F", desc: "Circle"}    
];
      
const operations = [
  {name: "AND",  desc: "Intersect of"},
  {name: "NAND", desc: "Negative intersect of"},
  {name: "OR",   desc: "Union of"},
  {name: "NOR",  desc: "Negative union of"},
  {name: "XOR",  desc: "Exclusive union of"},
  //{name: "CW",   desc: "Clockwise rotation of"},
  //{name: "CCW",  desc: "Counter-clockwise rotation of"}
]; 

console.log("==========================================================================================");
for (let i = 0; i < numOfCycles; i++) {
  for (cat of categories) {
    testComponent.catName = cat.name;
    ["A","B","C","F"].includes(cat.name) ? genArgsUnrestricted() : genArgsRestricted();
    //pre-calculate results of each operation (line 3 only)
    let res = [];
    for (op of operations) 
      res.push(bitwise(op.name, testComponent.line3.arg1, testComponent.line3.arg2));
    //console.log("Results: " + res);
    //validate (invalid cases will be replaced with -1)
    let validRes = validate(cat.name, res); 
    //console.log("Validated: " + validRes);
    validRes.forEach((e,i,a) => {
      if (e < 0) return;
      else {
        testComponent.opName = operations[i].name;
        console.log("Generating component for category " + testComponent.catName
           + " and operation " + testComponent.opName);
        countComponents = countComponents + 1;
        testComponent.line1.result 
           = bitwise(testComponent.opName, testComponent.line1.arg1, testComponent.line1.arg2);
        testComponent.line2.result 
           = bitwise(testComponent.opName, testComponent.line2.arg1, testComponent.line2.arg2);
        testComponent.line3.result 
           = bitwise(testComponent.opName, testComponent.line3.arg1, testComponent.line3.arg2);         
        //console.log(testComponent);           
      
        //Convert numbers to hex with num.toString(16)
        //convertToHex(testComponent);
        
        //Write to the DB
        
        TestComponent.create(testComponent, (err) => {
          if (err) { throw (err) }
          //console.log(`Created ${testcases.length} testcases`)<
        });
        
      }
    });

  }  //end of category processing
}  //end of cycle

console.log("Generated: " + countComponents + " components");

// }
//Functions

function validate(catname, opResults) {
  let uniqueRes = opResults.map((e,i,a) => {
    return (a.indexOf(e) === a.lastIndexOf(e)) ? e : -1;
  });
  let valid = uniqueRes.map((e,i,a) => {
    return (["NAND","NOR"].includes(operations[i].name) && ["D","E"].includes(catname)) ? -1 : e;
  });
  return valid;
}

function bitwise(op, arg1, arg2) {
  switch (op) {
    case "AND": return arg1 & arg2;
    case "NAND": return (~(arg1 & arg2)) & 15;
    case "OR": return arg1 | arg2;
    case "NOR": return (~(arg1 | arg2)) & 15;
    case "XOR": return arg1 ^ arg2;
    default: return 0;
  }
}

function genArgsUnrestricted() {
  testComponent.line1.arg1 = Math.floor((Math.random() * 16));
  testComponent.line1.arg2 = Math.floor((Math.random() * 16));
  testComponent.line2.arg1 = Math.floor((Math.random() * 16));
  testComponent.line2.arg2 = Math.floor((Math.random() * 16));
  testComponent.line3.arg1 = Math.floor((Math.random() * 16));
  testComponent.line3.arg2 = Math.floor((Math.random() * 16));
}

function genArgsRestricted() {
  const allowed = [8,4,2,1];
  const i = Math.floor((Math.random() * 4));
  const arg = allowed[i];
  testComponent.line1.arg1 = arg * Math.floor((Math.random() * 2));
  testComponent.line1.arg2 = arg * Math.floor((Math.random() * 2));
  testComponent.line2.arg1 = arg * Math.floor((Math.random() * 2));
  testComponent.line2.arg2 = arg * Math.floor((Math.random() * 2));
  testComponent.line3.arg1 = arg * Math.floor((Math.random() * 2));
  testComponent.line3.arg2 = arg * Math.floor((Math.random() * 2));
}



//remove
function convertToHex(comp) {
  comp.line1.arg1 = comp.line1.arg1.toString(16);
  comp.line1.arg2 = comp.line1.arg2.toString(16);
  comp.line1.result = comp.line1.result.toString(16);
  comp.line2.arg1 = comp.line2.arg1.toString(16);
  comp.line2.arg2 = comp.line2.arg2.toString(16);
  comp.line2.result = comp.line2.result.toString(16);
  comp.line3.arg1 = comp.line3.arg1.toString(16);
  comp.line3.arg2 = comp.line3.arg2.toString(16);
  comp.line3.result = comp.line3.result.toString(16);

}

// } module.exports = testComponentGenerator