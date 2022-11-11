const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  user_id: {
    type: mongoose.ObjectId,
  },
  name: {
    type: String,
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
  flight_id: {
    type: mongoose.ObjectId,
    required: [true, "Please provide a flight id!"],
    unique: true,
  },
});

const Chat = mongoose.model("chats", ChatSchema);

module.exports = Chat;
