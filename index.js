const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Chat = require("./db/models/chat.model");

/**/
const { Server } = require("socket.io");

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

/**/
const io = new Server(httpServer, {
  cors: {
    origin: frontendUrl,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (flightId) => {
    socket.join(flightId);
    console.log(`User with ID: ${socket.id} joined room: ${flightId}`);

    Chat.findOne({ flight_id: flightId }).exec((err, chat) => {
      if (err) {
        console.log("Got error", err);
        return;
      }

      let messages = [];
      if (!chat) {
        const newChat = new Chat({
          flight_id: flightId,
          messages: messages,
        });

        newChat.save();
      } else {
        messages = chat.messages.map(function (msg) {
          return {
            room: flightId,
            author: msg.name,
            authorId: msg.user_id,
            message: msg.text,
            time: msg.time,
          };
        });
      }

      console.log("Got chat messages: %j", messages);
      socket.emit("room_messages", messages);
    });
  });

  socket.on("send_message", (data) => {
    console.log("'send_message' called: %j", data);

    Chat.findOne({ flight_id: data.room }).exec((err, chat) => {
      if (err) {
        console.log("Got error", err);
        return;
      }

      chat.messages.push({
        text: data.message,
        user_id: data.authorId,
        name: data.author,
      });

      chat.save((err, updatedChat) => {
        if (err) {
          return;
        }

        socket.to(data.room).emit("receive_message", data);
      });
    });
  });

  socket.on("disconnect", () => {
    1;
    console.log("User Disconnected", socket.id);
  });
});

module.exports = app;
