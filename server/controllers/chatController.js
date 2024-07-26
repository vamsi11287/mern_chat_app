const asyncHandler = require("express-async-handler");
const userModel = require("../modals/userModel");
const chatModel = require("../modals/chatModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  var isChat = await chatModel
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await userModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await chatModel.create(chatData);
      const fullChat = await chatModel
        .findOne({ _id: createdChat._id })
        .populate("users", "-password");
      res.status(200).json(fullChat);
    } catch (err) {
      res.status(400).json({ error: "error is in auth" });
    }
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  try {
    chatModel
      .find({ users: { $elemMatch: { $ne: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        results = await userModel.populate(result, {
          path: "latestMessage.sender",
          select: "name email",
        });
        res.status(200).json(results);
      });
  } catch (err) {
    res.status(400).json({ error: "error in message" });
  }
});

const fetchGroups = asyncHandler(async (req, res) => {
  try {
    const allGroups = await chatModel.where("isGroupChat").equals(true);
    res.status(200).send(allGroups);
  } catch (err) {
    res.status(400).json({ error: "error in fetching groups" });
  }
});

const createGroupsChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json({ error: "Data isinsufficient" });
  }
  const users = JSON.parse(req.body.users);
  console.log(users, "create group");
  users.push(req.user);
  try {
    const groupChat = await chatModel.create({
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user,
    });
    const fullGroupChat = await chatModel
      .findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (err) {
    res.status(400).json({ error: "error in creating group" });
  }
});

const groupsExit = asyncHandler(async (req, res) => {
  const { chartId, userId } = req.body;
  const removed = await chatModel
    .findByIdAndUpdate(chartId, { $push: { users: userId } }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!removed) {
    res.status(400);
  } else {
    res.status(200).json(removed);
  }
});
const addSelfGroup = asyncHandler(async (req, res) => {
  const { chartId, userId } = req.body;
  const added = await chatModel
    .findByIdAndUpdate(chartId, { $push: { users: userId } }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(400);
  } else {
    res.status(200).json(added);
  }
});

module.exports = {
  accessChat,
  fetchChat,
  fetchGroups,
  createGroupsChat,
  groupsExit,
  addSelfGroup,
};
