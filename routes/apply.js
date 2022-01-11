const { applyuser, authenthicate } = require("../controllers/job");

const router = require("express").Router();
router.post("/", [authenthicate], applyuser);
module.exports = router;
