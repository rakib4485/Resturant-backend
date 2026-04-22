import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem", // 🔥 MenuItem model এর reference
    required: true
  },
  name: String,
  price: Number,
  quantity: Number,
  total: String
});

const orderSchema = new mongoose.Schema({
  token: {
    type: Number,
    required: true
  },
  items: [itemSchema],
  total: Number,
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);