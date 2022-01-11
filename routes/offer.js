const { offeruser, authenthicate } = require("../controllers/job");

const router = require("express").Router();
router.get("/", [authenthicate], offeruser);
module.exports = router;
