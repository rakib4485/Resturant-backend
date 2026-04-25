import express from "express";
import { getDashboard } from "../controlers/AdminDashboardController.js";
import verifyToken from "../middleware/verifyToken.js";
import { adminOnly } from "../middleware/verifyToken.js";
// import { getAdminDashboard } from "../controlers/adminController.js";

const router = express.Router();

router.get("/dashboard", verifyToken, adminOnly, getDashboard);

export default router;