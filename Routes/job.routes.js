import { Router } from "express";
import { registerJob, jobQuery, autocomplete, generateData } from "../Controllers/job.controller.js";

const router = Router();
router.post("/init/:nb", generateData);
router.post("/", registerJob);
router.get("/search", jobQuery);
router.get("/autocomplete", autocomplete);

export default router;
