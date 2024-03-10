const express = require("express");
const router = express.Router();
const User = require("../../model/UserModel");
const { body, validationResult } = require("express-validator");

router.post(
  "/createuser",
  [
    body("usertype", "invalid usertype").isLength({ min: 3 }),
    body("username", "invalid username").isLength({ min: 3 }),
    body("recordtype", "invalid recordtype").isLength({ min: 3 }),
    body("location", "invalid location").isLength({ min: 3 }),
    body("code", "invalid code").isLength({ min: 3 }),
    body("password", "Atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { usertype, username, recordtype, code, active, location, password } =
        req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = new User({
        usertype, username, recordtype, code, active, location, password
      });
      const saveUser = await user.save();
      res.json(saveUser);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: "Server error 500" });
    }
  }
);
module.exports = router;
