const { loginuser } = require("../controllers/job");

const router = require("express").Router();
router.post("/", loginuser);
module.exports = router;
