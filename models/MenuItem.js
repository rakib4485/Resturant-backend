import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String,
    mealTimes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MealTime",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("MenuItem", menuItemSchema);
