const express = require("express");
const { signin, signup, signout, validatetoken } = require("./controllers/auth.controller");
const { find_flight } = require("./controllers/flight.controller");
const { current_user } = require("./controllers/user.controller");
const router = express.Router();

router.post("/signin", (req, res) => {
  console.log("Seaching for user: " + req.body.email);
  signin(req, res);
});

router.post("/signup", (req, res) => {
  console.log("Testing: " + req.body.email);
  signup(req, res);
});

router.get("/signout", (req, res) => {
  signout(req, res);
});

router.get("/current_user", validatetoken, (req, res) => {
  current_user(req, res);
});

router.get("/flight", validatetoken, (req, res) => {
  find_flight(req, res);
});

router.get("/bookseat", validatetoken, (req, res) => {
  find_seats(req, res);
});

module.exports = router;
