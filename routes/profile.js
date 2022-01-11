const { viewuser, authenthicate, profileuser } = require("../controllers/job");

const router = require("express").Router();
router.post("/", [authenthicate], profileuser);
module.exports = router;
