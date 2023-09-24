import { Router } from "express";
import { registerJob, jobQuery, autocomplete, generateData, checkRecent } from "../Controllers/job.controller.js";

const router = Router();
router.post("/init/:nb", generateData);
router.post("/", registerJob);
router.get("/search", jobQuery);
router.get("/autocomplete", autocomplete);
router.get("/recents", checkRecent);

export default router;
