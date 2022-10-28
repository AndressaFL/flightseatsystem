const mongoose = require("mongoose");

const PassengerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.ObjectId,
  }
});

const SeatSchema = new mongoose.Schema({
  number: {
    type: String,
  },
  status: {
    type: String,
  },
  position: {
    type: String,
  },
  passenger: {
    type: PassengerSchema,
  },
});

const FlightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: [true, "Please provide a flight number!"],
    unique: false,
  },

  from: {
    type: String,
  },

  to: {
    type: String,
  },

  arrivingDate: {
    type: Date,
    default: Date.now(),
  },

  departingDate: {
    type: Date,
    default: Date.now(),
  },

  seats: {
    type: [SeatSchema],
  }
});

const Flight = mongoose.model("flights", FlightSchema);

module.exports = Flight;
