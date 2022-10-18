const express = require("express");
const { signin } = require("./controllers/auth.controller");
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
  signin(req, res)
});

module.exports = router;