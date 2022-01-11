const { authenthicate, viewcandidates } = require("../controllers/job");

const router = require("express").Router();
router.post("/", [authenthicate], viewcandidates);
module.exports = router;
