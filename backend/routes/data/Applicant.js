const express = require("express");
const router = express.Router();
const Loan = require("../../model/LoanModel");
const Applicant = require("../../model/ApplicantModel");
const { body, validationResult } = require("express-validator");

router.post(
  "/createapplicant",
  [
    body("fname", "invalid name").isLength({ min: 3 }),
    body("lan", "invalid lan").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        lan,
        type,
        fname,
        mname,
        lname,
        dob,
        gender,
        maritalStatus,
        education,
        poi,
        poa,
        poinum,
        poanum,
        occupation,
        pan,
        nationality,
        house,
        street,
        city,
        state,
        pincode,
        fatherName,
        motherName,
        spouse,
        email,
        mobile,
        relation
      } = req.body;

      const applicant = new Applicant({
        lan,
        type,
        fname,
        mname,
        lname,
        dob,
        gender,
        maritalStatus,
        education,
        poi,
        poa,
        poinum,
        poanum,
        occupation,
        pan,
        nationality,
        house,
        street,
        city,
        state,
        pincode,
        fatherName,
        motherName,
        spouse,
        email,
        mobile,
        relation
      });
      const saveApplicant = await applicant.save();
      res.json(saveApplicant);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error 500" });
    }
  }
);

router.get("/getapplicantlist", async (req, res) => {
  try {
    const applicants = await Applicant.find({});
    res.json(applicants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error 500" });
  }
});
module.exports = router;
