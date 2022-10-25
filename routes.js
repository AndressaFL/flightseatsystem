const express = require("express");
const { signin, signup } = require("./controllers/auth.controller");
const { current_user } = require("./controllers/user.controller");
const router = express.Router();

function protectRoute(req, res, next) {
  let token;
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    console.log("token not found! :(");
    return res.status(401).send({
      message: "Not authorized to access this route",
    });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = User.findById(decoded.id);
    User.findById(decoded.id).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      req.user = user;
      next();
    });
  } catch (err) {
    console.log("got and error: ");
    console.log(err);
    return res.status(401).send({
      message: "Not authorized to access this route",
    });
  }
}

router.post("/signin", (req, res) => {
  console.log("Seaching for user: " + req.body.email);
  signin(req, res);
});

router.post("/signup", (req, res) => {
  console.log("Testing: " + req.body.email);
  signup(req, res);
});

router.get("/signout", (req, res) => {
  // remove the req.user property and clear the login session
  req.logout();

  // destroy session data
  req.session = null;

  res.json("OK");
});

router.get("/current_user", protectRoute, (req, res) => {
  current_user(req, res);
});

exports.protectRoute = protectRoute;
module.exports = router;
