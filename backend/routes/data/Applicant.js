const express = require("express");
const router = express.Router();
const Loan = require('../../model/LoanModel')
const Applicant = require('../../model/ApplicantModel')
const { body, validationResult } = require("express-validator");

router.post('/createapplicant',  [

  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: "Server error 500" });
    }
  })

router.get('/getapplicantlist',
  async (req, res) => {
    try {
      const applicants = await Applicant.find({})
      res.json(applicants)
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: "Server error 500" });
    }
  })
module.exports = router;
 