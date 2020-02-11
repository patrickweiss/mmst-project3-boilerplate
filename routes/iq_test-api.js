const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Test = require('../models/tests');
const TestCase = require('../models/testCases');

// Get a specific test with its cases
router.get("/id/:testId", (req, res, next) => {

  Test.findById(req.params.testId)
  .then (tests => {
    const testData = tests;
    TestCase.find({ _id: {$in: testData.cases}})
      .then (arrayOfCases => {
        res.json({testData, arrayOfCases});
      })
      .catch(err => {
        res.json(err);
      })  
  })
  .catch(err => {
    res.json("No test found");    
  })  
});

// Select a test (and its cases) by complexity level (low, medium, high, or random)
router.get("/", (req, res, next) => {
  if (req.query.complexity === "Random")
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
        res.json("No test found");  
      })  
  else
    Test.find({complexity: req.query.complexity})
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
      res.json("No test found");  
    })  

});

module.exports = router;







