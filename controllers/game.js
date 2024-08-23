const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

// GET / game collection
router.get("/", ensureLoggedIn, (req, res) => {
  res.render("games/gameCollection.ejs");
});

// GET /portal2
router.get("/portal2", ensureLoggedIn, (req, res) => {
  res.render("games/portal2.ejs");
});

module.exports = router;
