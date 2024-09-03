const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../middleware/ensureLoggedIn");
const Game = require("../models/game");
const Comment = require("../models/comment");

router.get("/", ensureLoggedIn, async (req, res) => {
  const games = await Game.find({});
  res.render("games/gameCollection.ejs", { games });
});

router.post("/:gameId/comment", ensureLoggedIn, async (req, res) => {
  try {
    const { gameId } = req.params;
    const { text } = req.body;
    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: "Game not found" });
    const comment = new Comment({
      game: gameId,
      user: req.user._id,
      text: text,
    });
    await comment.save();
    game.comments.push(comment._id);
    await game.save();
    res.redirect(`/games/${gameId}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:gameId", async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId).populate({
      path: "comments",
      populate: { path: "user", select: "username" },
    });
    res.render("games/show.ejs", { game });
  } catch (err) {
    console.log(err);
    res.redirect("/games");
  }
});

router.delete("/:gameId/comments/:commentId", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentId
    );
    if (!deletedComment) {
      throw new Error("Comment not found");
    }
    await Game.updateMany(
      { comments: req.params.commentId },
      { $pull: { comments: req.params.commentId } }
    );
    const game = await Game.findById(req.params.gameId);
    console.log(game.comments);
    console.log("Comment deleted and references updated successfully");
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
  res.redirect(`/games/${req.params.gameId}`);
});

router.get("/:gameId/comments/:commentId/edit", async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    const comment = await Comment.findById(req.params.commentId);
    res.render("games/edit.ejs", { game, comment });
  } catch (err) {
    console.log("Error fetching comment for edit:", err);
    res.redirect("/");
  }
});

router.put("/:gameId/comments/:commentId", async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body
    );
    if (!updatedComment) {
      throw new Error("Comment not found");
    }
    console.log("Comment updated successfully");
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
  res.redirect(`/games/${req.params.gameId}`);
});

module.exports = router;
