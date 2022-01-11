const { candidateuser } = require("../controllers/job");

const router = require("express").Router();
router.post("/", candidateuser);
module.exports = router;
