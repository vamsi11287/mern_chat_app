// const mongoose = require("mongoose");

// const messageModel = mongoose.Schema(
//   {
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     receiver: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     chat: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Chat",
//     },
//   },
//   { timeStamp: true }
// );

// const message = mongoose.model("Message", messageModel);
// module.exports = message;

// models/messageModel.js

const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const conversationSchema = new mongoose.Schema({
  userA: String,
  userB: String,
  contents: [contentSchema]
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;


module.exports = Conversation;

