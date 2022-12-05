var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = require("../db/models/user.model");
const util = require("util");

//functions to get the requested data from the model
//create an HTML page displaying the data, and return it to the user to view it in the browser.

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
   
  //create new user using mongoose schema from models
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
  req.session = null
  res.send("OK");
};

exports.signin = (req, res) => {
  console.log("Seaching for user: " + req.body.email);
  //get the user
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
  //validate the hashed password we have in our database
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid login information!",
      });
    }
    // token - 24 hours
    const tokenExpiresIn = 86400; 
    //generate token to the user
    var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: tokenExpiresIn,
    });

    req.session.access_token = token;
    res.send("OK");
  });
};
