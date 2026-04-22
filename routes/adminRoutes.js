import express from "express";
import { getAdminDashboard } from "../controlers/AdminDashboardController.js";
// import { getAdminDashboard } from "../controlers/adminController.js";

const router = express.Router();

router.get("/dashboard", getAdminDashboard);

export default router;