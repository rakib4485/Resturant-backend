// routes/settingsRoutes.js
import express from "express";
const router = express.Router();

import { getSettings, updateSettings } from "../controlers/settingsController.js";

router.get("/", getSettings);
router.put("/", updateSettings);

export default router;