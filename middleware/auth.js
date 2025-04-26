const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid token user" });

    req.user = user; // Attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid", error: err.message });
  }
};

module.exports = authMiddleware;