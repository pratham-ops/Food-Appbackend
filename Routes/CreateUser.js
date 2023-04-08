var express = require("express");
var Router = express.Router();
var User = require("../Models/User.js");
var bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");



Router.post(
  "/create",
  body("email","Enter valid Email").isEmail(),

  body("password","Password Should be min 5 char").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);


    try {
      var user = new User({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secPassword,
      });
      await user.save();
      res.status(200).json({ message: "User created successfully" , success: true});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating user" , success: false});
    }
  }
);

module.exports = Router;
