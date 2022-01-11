const mongoose = require("mongoose");
const applySchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("apply", applySchema);
