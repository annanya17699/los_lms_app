const mongoose = require("mongoose");
const { Schema } = mongoose;

const LoanSchema = new Schema({
  lan: {
    type: Number,
    unique: true
  },
  primaryApplicant: {
    type: String,
    required: true
  },
  startdate: {
    type: Date,
    default: Date.now,
  },
  applicantList: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  assetList: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  so: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  uw: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  eligibility: {
    type: Boolean,
  },
  creditscore: {
    type: Number,
  },
  disbursal: {
    type: Date,
  },
  stage: {
    type: String,
    required: true,
  },
  substage: {
    type: String,
    required: true,
  },
  bu: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  cancelreason: {
    type: String,
  },
  canceldate: {
    type: Date,
  }
});
module.exports = mongoose.model("Loan", LoanSchema);
