const mongoose = require("mongoose");
const { Schema } = mongoose;

const UnderwritingScheme = new Schema({
  totalIncome : {
    type : Number,
    required : true
  },
  totalObligation : {
    type : Number,
    required : true
  },
  creditScore : {
    type : Number,
    required : true
  }, 
  eligibility : {
    type : Boolean,
    required : true
  },
  approvedLoanAmount : {
    type : Number,
    required : true
  },
  requestedLoanAmount : {
    type : Number,
    required : true
  }
});

module.exports = mongoose.model("underwriting", UnderwritingScheme);
