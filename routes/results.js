const express = require('express');
const router = express.Router();
const Results = require('../models/results');



router.get('/', (req, res) => {

  console.log("result Route", req.user);
  
  Results.findOne({"userName" : req.user.username}).sort({createdAt: 'desc'}).limit(1)
   .then(userResult => {
    let scores = userResult.score;
    let questions = userResult.numberOfCases;
    let ergebnis = Math.round((scores / questions) * 100)
    console.log(userResult, ergebnis);
    res.json(userResult);
   })

  });
  
  

module.exports = router;