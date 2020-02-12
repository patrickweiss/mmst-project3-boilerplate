const express = require('express');
const router = express.Router();
const Results = require('../models/results');
const mongoose = require('mongoose')



// Store a test result
router.post("/", (req, res, next) => {
  const testResult = req.body;
  //testResult.userName = req.session.user.userName;
  //console.log ("#### Result to be stored: " + JSON.stringify(testResult));
  testResult.testId = mongoose.Types.ObjectId(testResult.testId);
  //console.log ("#### Result with ObjectID: " + JSON.stringify(testResult));
  Results.create(testResult)
  .then()
  .catch((err) => {
    console.log(err)
  })
});


router.get('/', (req, res) => {

  console.log("result Route", req.user);
  
  Results.findOne({"userName" : req.user.username}).sort({createdAt: 'desc'}).limit(1)
   .then(userResult => {
    /* let scores = userResult.score;
    let questions = userResult.numberOfCases;
    let ergebnis = Math.round((scores / questions) * 100)
    console.log(userResult, ergebnis); */
    res.json(userResult);
   })

  });
  
  router.get("/id/:resultId", (req, res, next) => {
    console.log("see params", req.params.resultId)
    Results.findById(req.params.resultId)
    .then (result => {
      console.log("Result", result);
       res.json(result);
    })
     
  });
  

module.exports = router;