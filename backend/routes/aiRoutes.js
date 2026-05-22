const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  generateContent,
} = require("../controllers/aiController");

const router = express.Router();

router.post(
  "/generate",
  protect,
  generateContent
);

module.exports = router;