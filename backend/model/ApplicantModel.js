const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicantSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    fname: {
      type: String,
      required: true,
    },
    mname: {
      type: String,
    },
    lname: {
      type: String,
      required: true,
    },
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  poi: {
    type: String,
    required: true,
  },
  poa: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  pan: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  address: {
    house: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  spouse: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", ApplicantSchema);
