const express = require("express");
const Router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecret = process.env.JWT_KEY;


Router.post(
  "/login",
  body("email", "Please enter a valid email").isEmail(),
  body("password", "Please enter a valid password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;


    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(400).json({ message: "User not found" });
      }
      const pwdCompare = await bcrypt.compare(req.body.password, user.password);
      if (!pwdCompare) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      const token = jwt.sign({ id: user._id }, jwtSecret);
      return res
        .status(200)
        .json({ message: "Login Successful", success: true, token});
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  }
);

module.exports = Router;
