const express = require("express");
const router = express.Router();
const Loan = require('../../model/LoanModel')
const { body, validationResult } = require("express-validator");

router.post('/createloan',  [
    body('stage','invalid stage').isLength({ min: 3 }),
    body('substage','invalid substage').isLength({ min: 3 }),
    body('bu','invalid bu').isLength({ min: 3 }),
    body('location','invalid location').isLength({ min: 3 }),
    body('primaryApplicant','invalid ApplicantName').isLength({ min: 3 })
  ],
  async (req, res) => {
    try {
      const prevLoan = await Loan.findOne({}).sort({lan : -1}).limit(1)
    const {primaryApplicant, stage, substage, bu, location } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const loan =new Loan({
        lan: prevLoan != null ? prevLoan.lan+1 : 100, stage, substage, bu, location, primaryApplicant
      });
      const saveLan = await loan.save();
      res.json(saveLan);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: "Server error 500" });
    }
  })

router.get('/getloanlist',
  async (req, res) => {
    try {
      const loans = await Loan.find({})
      res.json(loans)
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: "Server error 500" });
    }
  })
module.exports = router;
 