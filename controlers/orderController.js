import Order from "../models/Order.js";

// 🔥 Create Order
export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // 🟡 TODAY START
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    // 🟡 TODAY END
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // 🔥 find today's last order only
    const lastOrderToday = await Order.findOne({
      createdAt: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

    // 🔥 token reset daily
    const token = lastOrderToday ? lastOrderToday.token + 1 : 1;

    const order = await Order.create({
      token,
      items,
      total,
    });

    res.status(201).json({
      message: "Order created successfully",
      orderId: order._id,
      token: order.token,
      order,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📊 Get Today's Orders
export const getTodayOrders = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const orders = await Order.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodayLastOrder = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const lastOrder = await Order.findOne({
      createdAt: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

    res.json(lastOrder || null);
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