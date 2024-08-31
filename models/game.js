const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  releaseDate: { type: Date },
  genre: { type: String },
  url: { type: String },
  urlCover: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Game", gameSchema);
