const router = require("express").Router();
const { registerJob, jobQuery } = require("../Controllers/job.controller");

router.post("/", registerJob);
router.get("/search", jobQuery);

module.exports = router;
