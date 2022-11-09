const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  user_id: {
    type: mongoose.ObjectId,
  },
  name: {
    type: String,
    required: [true, "Please provide a name!"],
    unique: [true, "Name Exist"],
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

const ChatSchema = new mongoose.Schema({
  messages: {
    type: [ChatMessageSchema],
  },
  flightNumber: {
    type: String,
    required: [true, "Please provide a flight number!"],
    unique: false,
  },
});

const ChatMessage = mongoose.model("Chat", ChatMessageSchema);

module.exports = ChatMessage;
