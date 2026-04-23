// models/Settings.js
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: "Foodie" },
    logo: { type: String },
    currency: { type: String, default: "BDT" },
    tax: { type: Number, default: 0 },
    autoPrint: { type: Boolean, default: true },
    dailyResetToken: { type: Boolean, default: true },
    receiptSize: { type: String, default: "80mm" },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);