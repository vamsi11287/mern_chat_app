const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChat,
  createGroupsChat,
  groupsExit,
  fetchGroups,
  addSelfGroup
} = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
router.route("/createGroups").post(protect, createGroupsChat);
router.route("/fetchGroups").get(protect, fetchGroups);
router.route("/groupsExit").put(protect, groupsExit);
router.route("/addSelfToGroup").put(protect, addSelfGroup);

module.exports = router;
