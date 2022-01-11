const {
  authenthicate,
  viewcandidates,
  deluser,
} = require("../controllers/job");

const router = require("express").Router();
router.post("/", [authenthicate], deluser);
module.exports = router;
