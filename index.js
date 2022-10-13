
//When you use the MERN stack, you work with React to implement the presentation layer, Express and Node to make up the middle or application layer, and MongoDB to create the database layer.
//command installs MongoDB database driver that allows your Node.js applications to connect to the database and work with data.

//installs the web framework for Node.js
const express = require('express');
const app = express();
//installs a Node.js package that allows cross origin resource sharing.
const cors = require("cors");
//dotenv - installs the module that loads environment variables from a .env file into process.env file. This lets you separate configuration files from the code.
require("dotenv").config({ path: "./config.env" });
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.ATLAS_URI);

app.use(bodyParser.json());

app.get(`/flights`, async (req, res) => {
  let flights = [
    {},
    {},
    {},
  ]
  return res.status(200).send(flights);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
   // perform a database connection when server starts
  console.log(`app running on port ${PORT}`)
});