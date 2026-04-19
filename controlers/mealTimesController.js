import MealTime from "../models/MealTime.js";

// 🔥 Create Meal Time
export const createMealTime = async (req, res) => {
  try {
    const { name, start, end } = req.body;
    const mealTime = await MealTime.create({ name, start, end });
    res.status(201).json(mealTime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📊 Get All Meal Times
export const getAllMealTimes = async (req, res) => {
  try {
    const mealTimes = await MealTime.find({});
    res.status(200).json(mealTimes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};