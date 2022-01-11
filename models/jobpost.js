const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  position: {
    type: String,
  },
  company: {
    type: String,
  },
  salary: {
    type: String,
  },
  skills: {
    type: String,
  },
  type: {
    type: String,
  },
  ldate: {
    type: String,
  },
  pdate: {
    type: String,
  },
  token: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  userid: {
    type: String,
    default: "",
  },
  candidates: {
    type: [String],
    default: [],
  },
});
module.exports = mongoose.model("jobz", jobSchema);
