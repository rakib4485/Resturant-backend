import mongoose from "mongoose";

const mealTimeSchema = new mongoose.Schema(
  {
    name: String,
    start: Number,
    end: Number
  },
  { timestamps: true }
);

export default mongoose.model("MealTime", mealTimeSchema, "mealTimes");