import Order from "../models/Order.js";

// 🔥 Create Order
export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    // Calculate total
    const totalAmount = items.reduce(
      (acc, item) => acc + item.total,
      0
    );

    // Auto token number (last + 1)
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });

    const tokenNumber = lastOrder ? lastOrder.tokenNumber + 1 : 1;

    const order = await Order.create({
      tokenNumber,
      items,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📊 Get Today's Orders
export const getTodayOrders = async (req, res) => {
  try {
    // const start = new Date();
    // start.setHours(0, 0, 0, 0);

    // const end = new Date();
    // end.setHours(23, 59, 59, 999);

    const orders = await Order.find({});

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📊 Dashboard Summary
export const getDashboard = async (req, res) => {
  try {
    const orders = await Order.find();

    const totalSales = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0
    );

    const totalOrders = orders.length;

    res.json({
      totalSales,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};