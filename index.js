const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require('cookie-session');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// load config file (environment variables)
dotenv.config({ path: "./config.env" });

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
const corsOptions = {
  methods: ['POST', 'PUT', 'PATCH', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true, 
  origin: frontendUrl,
  preflightContinue: true,
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
const cookieOptions = {
  maxAge: oneDay,
  httpOnly: true,
  proxy: true,
  domain: frontendUrl,
  secure: process.env.NODE_ENV === "production",
};

if (process.env.NODE_ENV === "production") {
  cookieOptions.sameSite = 'none';
  cookieOptions.secure = true;
}

const sessionConfig = {
  secret: process.env.JWT_SECRET,
  saveUninitialized: false,
  cookie: cookieOptions,
  resave: false,
}

if (process.env.NODE_ENV === "production") {
  sessionConfig.sameSite = 'none';
  sessionConfig.secure = true;

  app.set("trust proxy", 1);
}

app.use(cookieParser());
app.use(sessions(sessionConfig));

const routes = require("./routes");
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
/* perform a database connection when server starts*/
const httpServer = app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

module.exports = app;
