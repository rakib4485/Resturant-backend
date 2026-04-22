import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";

export const getAdminDashboard = async (req, res) => {
  try {
    // ===============================
    // 📦 TOTAL PRODUCTS
    // ===============================
    const totalProducts = await MenuItem.countDocuments();

    // ===============================
    // 🧾 TOTAL ORDERS
    // ===============================
    const totalOrders = await Order.countDocuments();

    // ===============================
    // 💰 TOTAL REVENUE
    // ===============================
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // ===============================
    // ⏳ PENDING ORDERS
    // ===============================
    const pendingOrders = await Order.countDocuments({
      status: "pending",
    });

    // ===============================
    // 📋 RECENT ORDERS (LAST 5)
    // ===============================
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // ===============================
    // RESPONSE
    // ===============================
    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      recentOrders,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};