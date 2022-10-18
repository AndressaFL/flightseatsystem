const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = require("../db/models/user.model");

exports.signup = (req, res) => {
  console.log("Adding new user: " + req.body.email);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.json("OK");
  });
};

exports.signin = (req, res) => {
  console.log("Seaching for user: " + req.body.email);
  User.findOne({
    email: req.body.email,
  })
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      console.log("User not found: " + req.body.email);
      return res.status(404).send({ message: "User Not found." });
    }

    console.log("User found: " + user);
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    console.log("token => " + token);

    res.json(token);
  });
};
