//INPUTS
const numOfComponents = 5;   //number of test components per case 
                             //(max 5, because categories D and E are mutually exclusive)

const mongoose = require('mongoose');
const TestCase = require('../models/testCases');
const TestComponent = require('../models/testComponents');

const dbName = 'IQTTY';
mongoose.connect(`mongodb://localhost/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//=====================================================


const testCase = {   
  catOps: [],    
  complexity: "",
  line1: {arg1: "", arg2: "", result: ""}, //hexadecimal strings of length 6
  line2: {arg1: "", arg2: "", result: ""},
  line3: {arg1: "", arg2: "", result: ""}
};


const numericTestCase = {   
  line1: {arg1: 0, arg2: 0, result: 0}, 
  line2: {arg1: 0, arg2: 0, result: 0},
  line3: {arg1: 0, arg2: 0, result: 0}
};

const categories = [
  {name: "A", desc: "Line"},
  {name: "B", desc: "Arc"},
  {name: "C", desc: "Dot"},
  {name: "D", desc: "Centric"},
  {name: "E", desc: "Arrow"},
  {name: "F", desc: "Circle"}    
];
      
const operations = [
  {name: "AND",  desc: "Intersection"},
  {name: "NAND", desc: "Complement of intersection"},
  {name: "OR",   desc: "Union"},
  {name: "NOR",  desc: "Complement of union"},
  {name: "XOR",  desc: "Symmetric difference"}
  //{name: "CW",   desc: "Clockwise rotation of"},
  //{name: "CCW",  desc: "Counter-clockwise rotation of"}
]; 

console.log("*********************************************************************");

//select categories
let selectedCats = [];
while (selectedCats.length < numOfComponents) {
  n = Math.floor(Math.random() * categories.length);
  cat = categories[n].name;
  //validation - categories D,E are mutually exclusive 
  if (selectedCats.includes(cat) 
      || (cat === "D" && selectedCats.includes("E")) 
      || (cat === "E" && selectedCats.includes("D")) ) continue;
  selectedCats.push(cat);
}

console.log("Categories selected for this case: " + selectedCats);
//Retrieve all components

TestComponent.find()
.then(docs => {
    //mongoose.connection.close();
    createTestCases(docs);
});   

function createTestCases(comps) {
  let numOfComponentsFromDB = comps.length;
  let selectedComps = [];
  //console.log("Number of components: " + numOfComponentsFromDB);  

  for (i = 0; i < selectedCats.length; i++) {
    let cat = selectedCats[i];
    let compsWithCategory = [];
    comps.reduce((acc, e) => {
      if (e.catName === cat) compsWithCategory.push(e);
    }, 0);
    //console.log("Components with category: " + cat)
    //console.log ("Components with category " + cat + ": " + compsWithCategory.length);
    
    let n = Math.floor(Math.random() * compsWithCategory.length);
    selectedComps.push(compsWithCategory[n]);
        
  }

  //console.log("Selected Components: ")
  //for (c of selectedComps) console.log ("Category: " + c.catName + " ID: " + c._id );

  //combine cases in one numericTestCase object

  numericTestCase.line1.arg1 = 0; 
  numericTestCase.line1.arg2 = 0; 
  numericTestCase.line1.result = 0; 

  numericTestCase.line2.arg1 = 0; 
  numericTestCase.line2.arg2 = 0; 
  numericTestCase.line2.result = 0; 

  numericTestCase.line3.arg1 = 0; 
  numericTestCase.line3.arg2 = 0; 
  numericTestCase.line3.result = 0; 

  //console.log(JSON.stringify(selectedComps));

  for (c of selectedComps) 
     addComponentToCase(c, numericTestCase);

  //populate the final testCase object
  for (c of selectedComps) testCase.catOps.push({catName: c.catName, opName: c.opName});
  testCase.complexity = (numOfComponents <= 2) ? "Low" : (numOfComponents <= 4) ? "Medium" : "High"; 

  //convert values to strings with .toString(16);
  testCase.line1.arg1 = numericTestCase.line1.arg1.toString(16);
  testCase.line1.arg2 = numericTestCase.line1.arg2.toString(16);
  testCase.line1.result = numericTestCase.line1.result.toString(16);

  testCase.line2.arg1 = numericTestCase.line2.arg1.toString(16); 
  testCase.line2.arg2 = numericTestCase.line2.arg2.toString(16); 
  testCase.line2.result = numericTestCase.line2.result.toString(16); 

  testCase.line3.arg1 = numericTestCase.line3.arg1.toString(16);
  testCase.line3.arg2 = numericTestCase.line3.arg2.toString(16);
  testCase.line3.result = numericTestCase.line3.result.toString(16);

  console.log("Case result: " + testCase.line3.result);
  for (c of testCase.catOps) 
    console.log ("Category: " + c.catName + " Operation: " + c.opName);

  //Write to the DB

  TestCase.create(testCase)
  .then(() => {
    mongoose.connection.close();
  }); 


}

function addComponentToCase(tcomp, tcase) {

  const catNames = ["A", "B", "C", "D", "E", "F"];
  const catWeights = [16**5, 16**4, 16**3, 16**2, 16, 1];
  const idx = catNames.indexOf(tcomp.catName);
  let weight = catWeights[idx];

  //console.log("Category: " + tcomp.catName + " WEIGHT: " + weight);

  //operations on numbers
  tcase.line1.arg1 = tcase.line1.arg1 + tcomp.line1.arg1 * weight;
  tcase.line1.arg2 = tcase.line1.arg2 + tcomp.line1.arg2 * weight;
  tcase.line1.result = tcase.line1.result + tcomp.line1.result * weight;

  tcase.line2.arg1 = tcase.line2.arg1 + tcomp.line2.arg1 * weight;
  tcase.line2.arg2 = tcase.line2.arg2 + tcomp.line2.arg2 * weight;
  tcase.line2.result = tcase.line2.result + tcomp.line2.result * weight;
  
  tcase.line3.arg1 = tcase.line3.arg1 + tcomp.line3.arg1 * weight;
  tcase.line3.arg2 = tcase.line3.arg2 + tcomp.line3.arg2 * weight;
  tcase.line3.result = tcase.line3.result + tcomp.line3.result * weight;

}






