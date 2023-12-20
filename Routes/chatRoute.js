const express = require("express");
const chat = require("../Controller/chatController");
const chatRouter = express.Router();

chatRouter.post("/chat", chat);

module.exports = chatRouter;
