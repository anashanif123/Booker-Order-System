const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    console.error("Fetch medicines error:", err);
    res.status(500).json({ message: "Error fetching medicines", error: err.message });
  }
});

module.exports = router;