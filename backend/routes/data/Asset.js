const express = require("express");
const router = express.Router();
const Asset = require("../../model/AssetModel");
const { body, validationResult } = require("express-validator");

router.post(
  "/createasset",
  [
    body("lan", "invalid lan").isLength({ min: 10 }),
    body("loantenure", "invalid branch").isNumeric(),
    body("frequency", "invalid ifsc").isNumeric(),
    body("type", "invalid micr").isLength({ min: 3 }),
    body("description", "invalid beneficiary").isLength({ min: 3 }),
    body("loanamount", "invalid accountnumber").isNumeric(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { lan, loantenure, frequency, type, description, loanamount } = req.body;

      const asset = new Asset({
        lan, loantenure, frequency, type, description, loanamount
      });
      const assetsaved = await asset.save();
      res.json(assetsaved);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error 500" });
    }
  }
);

module.exports = router;
