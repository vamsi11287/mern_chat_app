const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createConversation,
  getConversation,
} = require("../controllers/messageController");

router.post("/user", protect, createConversation);
router.post("/", protect, getConversation);

module.exports = router;
