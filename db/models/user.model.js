const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: [true, "Please provide a name!"],
    unique: [true, "Name Exist"],
    

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
    min: 6,
    max: 255 
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;