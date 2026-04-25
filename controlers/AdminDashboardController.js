import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";
// import MenuItem from "../models/MenuItem.js

export const getDashboard = async (req, res) => {
  try {
    const { date } = req.query;

    // ✅ If no date → use today
    const selectedDate = date ? new Date(date) : new Date();

    // ✅ Start & End of Day
    const start = new Date(selectedDate.setHours(0, 0, 0, 0));
    const end = new Date(selectedDate.setHours(23, 59, 59, 999));

    // =============================
    // 📊 TOTAL PRODUCTS
    // =============================
    const totalProducts = await MenuItem.countDocuments();

    // =============================
    // 📊 TODAY ORDERS
    // =============================
    const orders = await Order.find({
      createdAt: { $gte: start, $lte: end },
    });

    // =============================
    // 📊 TOTAL ORDERS
    // =============================
    const totalOrders = orders.length;

    // =============================
    // 💰 TOTAL REVENUE
    // =============================
    const totalRevenue = orders.reduce(
      (acc, order) => acc + (order.total || 0),
      0
    );

    // =============================
    // ⏳ PENDING ORDERS
    // =============================
    const pendingOrders = orders.filter(
      (order) => order.status === "pending"
    ).length;

    // =============================
    // 🧾 RECENT ORDERS
    // =============================
    const recentOrders = orders
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    // =============================
    // ✅ RESPONSE
    // =============================
    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      recentOrders,
    });

  } catch (error) {
    console.error("Dashboard Error:", error); // 🔥 IMPORTANT
    res.status(500).json({ message: error.message });
  }
};