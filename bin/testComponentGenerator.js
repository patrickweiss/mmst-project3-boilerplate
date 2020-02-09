const mongoose = require('mongoose');
const TestComponent = require('../models/testComponents');

const dbName = 'IQTTY';
mongoose.connect(`mongodb://localhost/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


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

  for (cat of categories) {
    testComponent.catName = cat.name;
    ["A","B","C","F"].includes(cat.name) ? genArgsUnrestricted() : genArgsRestricted();
    //pre-calculate results of each operation (line 3 only)
    //let res = [];
    //for (op of operations) 
    //  res.push(bitwise(op.name, testComponent.line3.arg1, testComponent.line3.arg2));
    //console.log(">>> Results for AND-NAND-OR-NOR-XOR: " + res);
    //validate (invalid cases will be replaced with -1)

    const validRes = validate(cat.name, testComponent.line1, testComponent.line2, testComponent.line3); 
    
    validRes.forEach((e,i,a) => {
      if (!e) return;
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
        
        //Write to the DB
     
        TestComponent.create(testComponent, (err) => {
          if (err) { throw (err) }
          
        });
  

      }
    });

  }  //end of category processing


console.log("Generated: " + countComponents + " components");

//Functions
/*
function validate(catname, opResults) {
  let uniqueRes = opResults.map((e,i,a) => {
    return (a.indexOf(e) === a.lastIndexOf(e)) ? e : -1;
  });
  let valid = uniqueRes.map((e,i,a) => {
    return (["NAND","NOR"].includes(operations[i].name) && ["D","E"].includes(catname)) ? -1 : e;
  });
  return valid;
}

*/

function validate(catname, line1, line2, line3) {
// Returns array of boolean flags for each operation for this category
// true: operation is valid and can be stored in a test component
// false: operation is ambiguouas (invalid)
// Validation rule: if results in line1 and line2 are equal for different operations 
// and results in line3 are different => eliminate all such operations

  let res1 = [];
  let res2 = [];
  let res3 = [];
  for (op of operations) {
    res1.push(bitwise(op.name, line1.arg1, line1.arg2));
    res2.push(bitwise(op.name, line2.arg1, line2.arg2));
    res3.push(bitwise(op.name, line3.arg1, line3.arg2));
  }
  console.log(">>> Results for category " + catname + " operations AND-NAND-OR-NOR-XOR: " );
  console.log("Line1: " + res1);
  console.log("Line2: " + res2);
  console.log("Line3: " + res3); 

  let x;
  const unique = res3.map((e,i,a) => {
    x = 16 * res1[i] + res2[i];
    for(let j = 0; j < a.length; j++) {
      if ((x === 16 * res1[j] + res2[j]) && e !== a[j])
        return false;
    }
    return true;
  });

  const valid = unique.map((e,i,a) => {
    return (["NAND","NOR"].includes(operations[i].name) && ["D","E"].includes(catname)) ? false : e;
  });

  console.log ("After validation: ", valid);
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



