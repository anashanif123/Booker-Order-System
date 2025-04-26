const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop"); // Corrected from Shops to Shop

router.get("/", async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (err) {
    console.error("Fetch shops error:", err);
    res.status(500).json({ message: "Error fetching shops", error: err.message });
  }
});

module.exports = router;