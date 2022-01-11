const mongoose = require("mongoose");
const mongodb = require("mongodb");
mongoose.connect(
  "mongodb+srv://ganesh:chitra@cluster0.2pjhw.mongodb.net/JP?retryWrites=true&w=majority",
  (err) => {
    if (err) return console.log(error);
    console.log("connected to mongodb");
  }
);
