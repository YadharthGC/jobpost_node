const { jobuser, authenthicate } = require("../controllers/job");

const router = require("express").Router();
router.post("/", [authenthicate], jobuser);

module.exports = router;
