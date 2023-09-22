const router = require("express").Router();
const { registerJob, jobQuery, autocomplete } = require("../Controllers/job.controller");

router.post("/", registerJob);
router.get("/search", jobQuery);
router.get("/autocomplete", autocomplete);

module.exports = router;
