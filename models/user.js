const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
