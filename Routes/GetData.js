var express = require("express");
var User = require("../Models/User.js");
var router = express.Router();


router.post("/getdata", (req, res) => {
  try {
    res.send([global.food_items, global.foodCategory]);
    // console.log(global.data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
