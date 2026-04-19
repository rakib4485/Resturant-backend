import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

const orderSchema = new mongoose.Schema({
  token: {
    type: Number,
    required: true
  },
  items: [itemSchema],
  total: Number,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);