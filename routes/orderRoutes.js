import express from "express";
import {
  createOrder,
  getTodayOrders,
  getTodayLastOrder,
  getDashboard
} from "../controlers/orderController.js";

import { getAllMealTimes, createMealTime } from "../controlers/mealTimesController.js";
import { createMenuItem, getAllMenuItems, getMenuItemById, updateMenuItem, deleteMenuItem } from "../controlers/menuController.js";
import verifyToken from "../middleware/verifyToken.js";
import { adminOnly } from "../middleware/verifyToken.js";

const router = express.Router();

// Order Routes
router.post("/create", verifyToken, createOrder);
router.get("/today", verifyToken, getTodayOrders);
router.get("/dashboard", verifyToken, getDashboard);
router.get("/today-last", verifyToken, getTodayLastOrder);

// Meal Time Routes
router.post("/meal-times-create", verifyToken, createMealTime);
router.get("/meal-times", verifyToken, getAllMealTimes);

// Menu Item Routes
router.get("/menu-items", verifyToken, getAllMenuItems);
router.post("/menu-items-create", verifyToken, createMenuItem);
router.get("/menu-items/:id", verifyToken, getMenuItemById);
router.put("/menu-items/:id", verifyToken, updateMenuItem);
router.delete("/menu-items/:id", verifyToken, deleteMenuItem);


export default router;

