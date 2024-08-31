const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  user: {type: Schema.Types.ObjectId, ref: "User", required: true},
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
