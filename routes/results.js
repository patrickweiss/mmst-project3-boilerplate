const express = require('express');
const router = express.Router();
const Results = require('../models/results');
const mongoose = require('mongoose')

// Store a test result
router.post("/", (req, res, next) => {
  let testResult = req.body;
  testResult.testId = mongoose.Types.ObjectId(testResult.testId);
  //console.log ("#### Result with ObjectID: " + JSON.stringify(testResult));
  Results.create(testResult)
  .then(() => {
    //console.log(">>>> testResult: ", testResult);
    res.json("Success");
  })
  .catch((err) => {
    console.log(err)
  })
});

router.get('/', (req, res) => {
  Results.findOne({"userName" : req.user.username}).sort({createdAt: 'desc'}).limit(1)
  .then(userResult => {
    res.json(userResult);
  })
});
  
router.get("/id/:resultId", (req, res, next) => {
  Results.findById(req.params.resultId)
  .then (result => {
    res.json(result);
  })
});
  
module.exports = router;