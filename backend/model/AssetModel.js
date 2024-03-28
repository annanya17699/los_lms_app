const mongoose = require("mongoose");
const { Schema } = mongoose;

const AssetScheme = new Schema({
  lan: {
    type: String,
    required: true
  },
  loantenure: {
    type: Number,
    required: true
  },
  frequency: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  loanamount:{
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("asset", AssetScheme);
