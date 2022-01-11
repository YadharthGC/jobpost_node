const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
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
  major: {
    type: String,
  },
  clg: {
    type: String,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  skills: {
    type: String,
  },
  url: {
    type: String,
  },
  token: {
    type: String,
  },
  likes: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("candidates", candidateSchema);
