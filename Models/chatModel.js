const mongoose = require("mongoose");

// Create a mongoose schema for chat messages
const chatSchema = new mongoose.Schema({
  room: String,
  user: String,
  message: String,
}); 

module.exports = mongoose.model("chatModel", chatSchema);
