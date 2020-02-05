const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Test = require('../models/tests');
const TestCase = require('../models/testCases');
const Result = require("../models/results");


// Get a random test with its cases
router.get("/tests/random", (req, res, next) => {

  //if (!req.session.user){
  //  res.redirect('/login');
  //  return;
  //}

  Test.find()
    .then (tests => {
      const n = Math.floor(Math.random() * tests.length);
      const testData = tests[n];
      TestCase.find({ _id: {$in: testData.cases}})
        .then (arrayOfCases => {
          res.json({testData, arrayOfCases});
        })
        .catch(err => {
          res.json(err);
        })  
    })
    .catch(err => {
      res.json(err);  
    })  
});

// Get a specific test with its cases
router.get("/tests/id/:testId", (req, res, next) => {

    Test.findById(req.params.testId)
    .then (tests => {
      const testData = tests[0];
      TestCase.find({ _id: {$in: testData.cases}})
        .then (arrayOfCases => {
          res.json({testData, arrayOfCases});
        })
        .catch(err => {
          res.json(err);
        })  
    })
    .catch(err => {
      res.json(err);  
    })  
});

// Store a test result
router.post("/results", (req, res, next) => {
  const testResult = req.body;
  //testResult.userName = req.session.user.userName;
  console.log ("#### Result to be stored: " + JSON.stringify(testResult));
  Result.create(testResult)
  .then();

});


module.exports = router;







