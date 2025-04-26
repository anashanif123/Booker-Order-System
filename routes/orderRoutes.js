const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders } = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.post("/", auth, createOrder);
router.get("/my-orders", auth, getMyOrders);
router.get("/", auth, getAllOrders);

module.exports = router;