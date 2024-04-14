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
    ref: "Applicant"
  },
  documentList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "document"
  },
  assetList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "asset"
  },
  so: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  uw: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "underwriting"
  },
  bankdetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "financial"
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
