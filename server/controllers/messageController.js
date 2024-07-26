const asyncHandler = require("express-async-handler");
const Conversation = require("../modals/messageModel");
const chatModel = require("../modals/chatModel");
const userModel = require("../modals/userModel");

const createConversation = async (req, res) => {
  try {
    const { userA, userB, sender, receiver, message } = req.body;
    let conversation = await Conversation.findOne({
      $or: [
        { userA, userB },
        { userA: userB, userB: userA },
      ],
    });

    if (!conversation) {
      conversation = new Conversation({
        userA,
        userB,
        contents: [{ sender, receiver, message }],
      });
    } else {
      conversation.contents.push({ sender, receiver, message });
    }

    await conversation.save();

    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getConversation = async (req, res) => {
  try {
    const { userA, userB } = req.body;

    let conversation = await Conversation.findOne({
      $or: [
        { userA, userB },
        { userA: userB, userB: userA },
      ],
    });
    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createConversation, getConversation };
