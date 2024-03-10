const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  usertype: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  recordtype: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  active: {
    type: Boolean
  },
  location: {
    type: String,
  },
  password:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
