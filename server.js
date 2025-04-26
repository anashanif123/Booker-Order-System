const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const shopsRoutes = require("./routes/shops");
const medicinesRoutes = require("./routes/medicines");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// CORS configuration for frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Root route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shops", shopsRoutes);
app.use("/api/medicines", medicinesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});