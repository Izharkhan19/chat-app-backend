const chatModel = require("../Models/chatModel.js");

const chatSave = async (req, res) => {
  let { room, user, message } = req?.body;
  try {
    const chatMessage = new chatModel({
      room: room,
      user: user,
      message: message,
    });

    // Save the chat message to the database
    await chatMessage.save();
    res.status(201).json({
      user: user,
      message: "Message Saved Successfully.",
    });
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = chatSave;
