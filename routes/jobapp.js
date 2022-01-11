const { jobapp, authenthicate } = require("../controllers/job");

const router = require("express").Router();
router.get("/", [authenthicate], jobapp);

module.exports = router;
