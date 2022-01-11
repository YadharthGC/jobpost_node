const { registeruser } = require("../controllers/job");

const router = require("express").Router();
router.post("/", registeruser);
module.exports = router;
