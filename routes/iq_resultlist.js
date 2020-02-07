const express = require("express");
const router = express.Router();
const Results = require('../models/results');

router.get("/", (req, res) => {
  //console.log("Resultlist User: ", req.user )
  Results.find({"userName" : req.user.username}).sort({createdAt: 'desc'})
   .then(resultList => {    
    //console.log("resultslist: ", resultList);
    res.json(resultList);
   })

})

/* router.get("/results/id/:resultId", (req, res, next) => {
  console.log("see params", req.params.resultId)
  Results.findById(req.params.resultId)
  .then (result => {
    console.log("Result", result);
     res.json(result);
  })
   
}); */

module.exports = router;