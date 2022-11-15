const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Chat = require("./db/models/chat.model");

require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
const corsOptions = { credentials: true, origin: frontendUrl };
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
