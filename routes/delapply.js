const {
  applyuser,
  authenthicate,
  delapplyuser,
} = require("../controllers/job");

const router = require("express").Router();
router.post("/", [authenthicate], delapplyuser);
module.exports = router;
