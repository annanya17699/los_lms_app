const mongoose = require("mongoose");
const { Schema } = mongoose;

const AssetScheme = new Schema({
  loantenure: {
    type: Number,
    required: true
  },
  frequency: {
    type: String,
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
  },
  category: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("asset", AssetScheme);
