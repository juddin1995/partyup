const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../middleware/ensureLoggedIn");
const User = require("../models/user");

// GET / game collection
router.get("/", ensureLoggedIn, (req, res) => {
  res.render("games/gameCollection.ejs");
});

// GET /portal2
router.get("/portal2", ensureLoggedIn, async (req, res) => {
  const owner = await User.findById(req.user._id);
  res.render("games/portal2.ejs", { owner });
});

// POST /portal2 
router.post("/portal2", ensureLoggedIn, async (req, res) => {
  const owner = await User.findById(req.user._id);
  owner.comments.push(req.body);
  await owner.save();
  res.redirect('/games/gameCollection/portal2');
});

// GET /chainedTogether
router.get("/chainedTogether", ensureLoggedIn, async (req, res) => {
  const owner = await User.findById(req.user._id);
  res.render("games/chainedTogether.ejs", { owner });
});

// POST /chainedTogether
router.post("/chainedTogether", ensureLoggedIn, async (req, res) => {
  const owner = await User.findById(req.user._id);
  owner.comments.push(req.body);
  await owner.save();
  res.redirect('/games/gameCollection/chainedTogether');
});

// GET /eldenRing
router.get("/eldenRing", ensureLoggedIn, async (req, res) => {
  const owner = await User.findById(req.user._id);
  res.render("games/eldenRing.ejs", { owner });
});

// POST /eldenRing
router.post("/eldenRing", ensureLoggedIn, async (req, res) => {
  const owner = await User.findById(req.user._id);
  owner.comments.push(req.body);
  await owner.save();
  res.redirect('/games/gameCollection/eldenRing');
});

module.exports = router;
