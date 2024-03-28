const express = require("express");
const router = express.Router();
const Financial = require("../../model/FinancialModel");
const { body, validationResult } = require("express-validator");

router.post(
  "/createbankdetails",
  [
    body("bankname", "invalid bank").isLength({ min: 3 }),
    body("branchname", "invalid branch").isLength({ min: 3 }),
    body("ifsc", "invalid ifsc").isLength({ min: 3 }),
    body("micr", "invalid micr").isLength({ min: 3 }),
    body("beneficiary", "invalid beneficiary").isLength({ min: 3 }),
    body("accountnumber", "invalid accountnumber").isLength({ min: 3 }),
    body("accounttype", "invalid accounttype").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        bankname,
          branchname,
          ifsc,
          micr,
          beneficiary,
          accountnumber,
          accounttype
      } = req.body;

      const bankdetails = new Financial({
        bankname,
          branchname,
          ifsc,
          micr,
          beneficiary,
          accountnumber,
          accounttype
      });
      const bankDetailsSaved = await bankdetails.save();
      res.json(bankDetailsSaved);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error 500" });
    }
  }
);

module.exports = router;
