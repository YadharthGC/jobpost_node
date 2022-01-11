const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  gmail: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("registers", registerSchema);
