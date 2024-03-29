const express = require("express");
const router = express.Router();
const Asset = require("../../model/AssetModel");
const { body, validationResult } = require("express-validator");

router.post(
  "/createasset",
  [
    body("loantenure", "invalid loantenure").isNumeric(),
    body("frequency", "invalid frequency").isLength({ min: 3 }),
    body("type", "invalid type").isLength({ min: 3 }),
    body("description", "invalid description").isLength({ min: 3 }),
    body("loanamount", "invalid accountnumber").isNumeric(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { loantenure, frequency, type, description, loanamount, category } = req.body;

      const asset = new Asset({
        loantenure, frequency, type, description, loanamount, category
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
