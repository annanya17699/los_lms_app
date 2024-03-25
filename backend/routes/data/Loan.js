const express = require("express");
const router = express.Router();
const Loan = require("../../model/LoanModel");
const { body, validationResult } = require("express-validator");

router.post(
  "/createloan",
  [
    body("stage", "invalid stage").isLength({ min: 3 }),
    body("substage", "invalid substage").isLength({ min: 3 }),
    body("bu", "invalid bu").isLength({ min: 3 }),
    body("location", "invalid location").isLength({ min: 3 }),
    body("primaryApplicant", "invalid ApplicantName").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const prevLoan = await Loan.findOne({}).sort({ lan: -1 }).limit(1);
      const {
        primaryApplicant,
        startdate,
        applicantList,
        assetList,
        so,
        uw,
        eligibility,
        disbursal,
        stage,
        substage,
        bu,
        location,
        cancelreason,
        canceldate,
        bankdetails
      } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let newstage = "";
      let newsubstage = "";
      if (stage === "New") {
        newstage = "KYC";
      }
      if (substage === "New") {
        newsubstage = "Applicant KYC";
      }
      const loan = new Loan({
        lan: prevLoan != null ? prevLoan.lan + 1 : 1000000000,
        primaryApplicant,
        startdate,
        applicantList,
        assetList,
        so : '65f6a9c8285d4c909c2e99d8',
        uw,
        disbursal,
        stage: stage !== 'New' ? stage : newstage,
        substage: substage !== 'New' ? substage : newsubstage,
        bu,
        location,
        cancelreason,
        canceldate,
        bankdetails
      });
      const saveLan = await loan.save();
      res.json(saveLan);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error 500" });
    }
  }
);

router.get("/getloanlist", async (req, res) => {
  try {
    const loans = await Loan.find({});
    res.json(loans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error 500" });
  }
});

router.get("/getloan/:id", async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    res.json(loan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error 500" });
  }
});

router.put(
  "/updateLoan/:id/:appId/:stage/:substage",
  async (req, res) => {
    try {
      const existingLoan = await Loan.findById(req.params.id);
    if (!existingLoan) return res.status(404).json({ error: "Note not Found" });
      if(req.params.stage === 'KYC' || req.params.stage === 'Financial Details'){
        existingLoan.applicantList.push(req.params.appId);
      }else if(req.params.stage === 'Asset Details'){
        existingLoan.bankdetails = req.params.appId;
      }else if(req.params.stage === 'Underwriting'){
        existingLoan.assetList.push(req.params.appId);
      }else if(req.params.stage === 'Upload Documents'){
        existingLoan.uw = req.params.appId;
      }else if(req.params.stage === 'Disbursal'){
        existingLoan.disbursal = Date.now();
      }
      existingLoan.stage = req.params.stage;
      existingLoan.substage = req.params.substage;
      const loanUpdated = await Loan.findByIdAndUpdate(
        req.params.id,
        { $set: existingLoan },
        { new: true }
      );
      res.json(loanUpdated);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error 500" });
    }
  }
);

router.put(
  "/cancelLoan/:id",
  [
    body("cancelreason", "invalid cancel reason").isLength({ min: 3 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const existingLoan = await Loan.findById(req.params.id);
    if (!existingLoan) return res.status(404).json({ error: "Note not Found" });
      existingLoan.stage = 'Cancel';
      existingLoan.substage = 'Cancel';
      existingLoan.canceldate = Date.now();
      existingLoan.cancelreason = req.body.cancelreason;
      const loanUpdated = await Loan.findByIdAndUpdate(
        req.params.id,
        { $set: existingLoan },
        { new: true }
      );
      res.json(loanUpdated);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error 500" });
    }
  }
);
module.exports = router;
