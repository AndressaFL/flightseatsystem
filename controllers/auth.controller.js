var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = require("../db/models/user.model");
const util = require("util");

exports.validatetoken = (req, res, next) => {
  const token = req.session.access_token;

  if (!token) {
    console.log("token not found! :(");
    return res.status(401).send({
      message: "Not authorized to access this route",
    });
  }

  // verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  User.findById(decoded.id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    req.user = user;
    next();
  });
};

exports.signup = (req, res) => {
  console.log("Adding new user: " + req.body.email);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  const validateError = user.validateSync();

  if (validateError) {
    let errorMessages = [];
    if (validateError.errors["name"]) {
      errorMessages.push({ message: validateError.errors["name"].message });
    }

    if (validateError.errors["email"]) {
      errorMessages.push({ message: validateError.errors["email"].message });
    }

    res.status(400).json({ errors: errorMessages });
    return;
  }

  User.findOne({ email: req.body.email }).exec((err, currentUser) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error Occurred" });
      return;
    } else if (currentUser) {
      res.status(400).json({errors: [{ message: "There's an user with this email already." }],});
      return;
    }

    user.save((err, user) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error Occurred" });
        return;
      }

      res.status(200).json({
        message: "user created sucessfully",
      });
    });
  });
};

exports.signout = (req, res) => {
  req.user = null;
  res.clearCookie("access_token").send("OK");
};

exports.signin = (req, res) => {
  console.log("Seaching for user: " + req.body.email);
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid login information!",
      });
    }

    const tokenExpiresIn = 86400; // 24 hours
    var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: tokenExpiresIn,
    });

    /*
    const options = {
      expires: new Date(Date.now() + tokenExpiresIn),
      httpOnly: true,
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      secure: process.env.NODE_ENV === "production",
    };

    if (process.env.NODE_ENV === "production") {
      options["sameSite"] = "none";
    }
    */

    req.session.access_token = token;
    res.send("OK");
  });
};
