const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Test = require('../models/tests');
const TestCase = require('../models/testCases');
const Result = require("../models/results");


// Get a random test with its cases
router.get("/random", (req, res, next) => {

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
      res.json(err);  
    })  
});


module.exports = router;







