const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const port = process.env.PORT || 3002;
require("./db");
/////////////////////////////////////////
const jobrouter = require("./routes/job");
const jobapprouter = require("./routes/jobapp");
const registerrouter = require("./routes/register");
const loginrouter = require("./routes/login");
const offerrouter = require("./routes/offer");
const applyrouter = require("./routes/apply");
const viewrouter = require("./routes/view");
const candidaterouter = require("./routes/candidates");
const cloginrouter = require("./routes/clogin");
const profilerouter = require("./routes/profile");
const delapplyrouter = require("./routes/delapply");
const cviewrouter = require("./routes/cviews");
const delrouter = require("./routes/deluser");

app.use("/post", jobrouter);
app.use("/get", jobapprouter);
app.use("/register", registerrouter);
app.use("/login", loginrouter);
app.use("/offers", offerrouter);
app.use("/apply", applyrouter);
app.use("/view", viewrouter);
app.use("/candidate", candidaterouter);
app.use("/clogin", cloginrouter);
app.use("/profile", profilerouter);
app.use("/delapply", delapplyrouter);
app.use("/cview", cviewrouter);
app.use("/getdel", delrouter);

///////////////////////////////////////
app.listen(port, function () {
  console.log("app running");
});
