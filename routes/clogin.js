const { candidatelogin } = require("../controllers/job");

const router = require("express").Router();
router.post("/", candidatelogin);
module.exports = router;
