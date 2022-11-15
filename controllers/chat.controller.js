const Chat = require("../db/models/chat.model");
const Flight = require("../db/models/flight.model");

exports.messages = (req, res) => {
  let flightId = req.params.flightId;

  Chat.findOne({ flight_id: flightId }).exec((err, chat) => {
    if (err) {
      console.log("Got error", err);
      res.status(500).send({ message: err });
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

    return res.json(messages);
  });
};

exports.send_message = (req, res) => {
  let flightId = req.params.flightId;
  console.log("'send_message' called: %j", req.body);

  Chat.findOne({ flight_id: flightId }).exec((err, chat) => {
    if (err) {
      console.log("Got error", err);
      res.status(500).send({ message: err });
      return;
    }

    chat.messages.push({
      text: req.body.message,
      user_id: req.body.authorId,
      name: req.body.author,
    });

    chat.save((err, updatedChat) => {
      if (err) {
        return;
      }

      return res.json(chat.messages);
    });
  });
};