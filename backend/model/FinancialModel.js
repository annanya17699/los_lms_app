const mongoose = require("mongoose");
const { Schema } = mongoose;

const FinancialScheme = new Schema({
  bankname: {
    type: String,
    required: true
  },
  branchname: {
    type: String,
    required: true
  },
  ifsc: {
    type: String,
    required: true
  },
  micr: {
    type: String,
    required: true,
  },
  beneficiary: {
    type: String,
    required: true,
  },
  accountnumber: {
    type: String,
    required: true,
  },
  accounttype:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model("financial", FinancialScheme);
