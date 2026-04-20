import MenuItem from "../models/MenuItem.js";
// 🔥 Create Menu Item
export const createMenuItem = async (req, res) => {
  try {
    const { name, price, description, mealTimes, image } = req.body;
    const menuItem = await MenuItem.create({ name, price, description, mealTimes, image });
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📊 Get All Menu Items
export const getAllMenuItems = async (req, res) => {
  try {
    // console.log("Fetching all menu items...");
    const menuItems = await MenuItem.find({});
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMenuItemsByMealTime = async (req, res) => {
  try {
    const { mealTimeId } = req.params;
    const menuItems = await MenuItem.find({ mealTimes: mealTimeId });
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findById(id);
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, mealTimes } = req.body;
    const menuItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, price, description, mealTimes },
      { new: true }
    );
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

