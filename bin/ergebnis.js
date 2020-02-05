const mongoose = require('mongoose');
const Results = require('../models/results');


mongoose.connect('mongodb://localhost/IQTTY', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const results = [
  {
  userName: "Karin",
  testName: "2ter Test",
  elapsedTime: 4501,
  numberOfCases: 8,
  score: 5,
  complexity: "Medium"
  },
  {
    userName: "du",
    testName: "IUH53X523523",
    elapsedTime: 2300,
    numberOfCases: 45,
    score: 70,
    complexity: "Strong"
  },
  
    {
      userName: "du",
      testName: "IUH532523523",
      elapsedTime: 2300,
      numberOfCases: 5,
      score: 7,
      complexity: "Strong"
    }
];
Results.insertMany(results)
  .then(result => {
    console.log('Result daten sind korrekt in der DB');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(`An error occured: ${err}`);
  });