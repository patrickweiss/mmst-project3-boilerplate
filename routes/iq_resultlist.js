const express = require("express");
const router = express.Router();
const Results = require('../models/results');

router.get("/", (req, res) => {
  console.log("Resultlist User: ", req.user )
  Results.find({"userName" : req.user.username}).sort({createdAt: 'desc'})
   .then(resultList => {    
    console.log("resultslist: ", resultList);
    res.json(resultList);
   })

})

module.exports = router;