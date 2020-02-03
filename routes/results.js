const express = require('express');
const router = express.Router();
const Results = require('../models/results');



router.get('/results', (req, res) => {
  if (!req.session.user){
    res.redirect('/login');
    return;
  }  
  const sessUs = req.session.user.userName;
  Results.findOne({"userName" : sessUs}).sort({createdAt: 'desc'}).limit(1)
   .then(userResult => {
    let scores = userResult.score;
    let questions = userResult.numberOfCases;
    let ergebnis = Math.round((scores / questions) * 100)
    res.render('results', {userResult, ergebnis:ergebnis});
   })
  });
  
  

module.exports = router;