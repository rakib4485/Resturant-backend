import express from "express";
import {
  createOrder,
  getTodayOrders,
  getTodayLastOrder,
  getDashboard
} from "../controlers/orderController.js";

import { getAllMealTimes, createMealTime } from "../controlers/mealTimesController.js";
import { createMenuItem, getAllMenuItems, getMenuItemById, updateMenuItem, deleteMenuItem } from "../controlers/menuController.js";

const router = express.Router();

// Order Routes
router.post("/create", createOrder);
router.get("/today", getTodayOrders);
router.get("/dashboard", getDashboard);
router.get("/today-last", getTodayLastOrder);

// Meal Time Routes
router.post("/meal-times-create", createMealTime);
router.get("/meal-times", getAllMealTimes);

// Menu Item Routes
router.get("/menu-items", getAllMenuItems);
router.post("/menu-items-create", createMenuItem);
router.get("/menu-items/:id", getMenuItemById);
router.put("/menu-items/:id", updateMenuItem);
router.delete("/menu-items/:id", deleteMenuItem);


export default router;

