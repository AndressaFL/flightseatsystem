const express = require("express");
const { signin } = require("./controllers/auth.controller");
const { signup } = require("./controllers/auth.controller");
const router = express.Router();
//const User = require("./db/models/user.model");

/*
router.post("/signin", async (request, response) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});
*/

router.post("/signin", (req, res) => {
  console.log("Seaching for user: " + req.body.email);
  signin(req, res)
});

router.post("/signup", (req, res) => {
  console.log("Testing: " + req.body.email);
  signup(req, res)
});
/*// Logout
router.get('/signout', function(req, res, next) {
  // remove the req.user property and clear the login session
  req.logout();

  // destroy session data
  req.session = null;

  // redirect to homepage
  res.redirect('/');
});*/

module.exports = router;