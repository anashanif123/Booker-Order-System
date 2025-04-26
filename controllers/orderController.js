const Order = require("../models/Order");
const Shop = require("../models/Shop");
const Medicine = require("../models/Medicine");

const createOrder = async (req, res) => {
  const { shop, items } = req.body;
  const booker = req.user._id;

  try {
    // Validate inputs
    if (!shop || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Shop and items are required" });
    }

    // Validate each item
    for (const item of items) {
      if (!item.medicine || !item.quantity || item.quantity < 1) {
        return res.status(400).json({ message: "Invalid medicine or quantity" });
      }
    }

    // Validate shop exists
    const shopExists = await Shop.findById(shop);
    if (!shopExists) {
      return res.status(400).json({ message: "Invalid shop ID" });
    }

    // Validate medicines and stock
    for (const item of items) {
      const medicine = await Medicine.findById(item.medicine);
      if (!medicine) {
        return res.status(400).json({ message: `Invalid medicine ID: ${item.medicine}` });
      }
      if (medicine.availableStock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${medicine.name}` });
      }
      // Update stock
      medicine.availableStock -= item.quantity;
      await medicine.save();
    }

    const newOrder = await Order.create({
      booker,
      shop,
      items
    });

    const populatedOrder = await Order.findById(newOrder._id)
      .populate("shop", "name")
      .populate("items.medicine", "name");

    res.status(201).json({ message: "Order created", order: populatedOrder });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Order creation failed", error: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ booker: req.user._id })
      .populate("shop", "name")
      .populate("items.medicine", "name");
    res.json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("booker", "name")
      .populate("shop", "name")
      .populate("items.medicine", "name");
    res.json(orders);
  } catch (error) {
    console.error("Fetch all orders error:", error);
    res.status(500).json({ message: "Error fetching all orders", error: error.message });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders };