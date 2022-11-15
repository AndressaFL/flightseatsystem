const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: [true, "Please provide a name!"]
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    match:[/^\S+@\S+$/g, 'invalid email format'],
    unique: [true, "Email Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;