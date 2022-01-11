const { viewuser, authenthicate } = require("../controllers/job");

const router = require("express").Router();
router.post("/", [authenthicate], viewuser);
module.exports = router;
