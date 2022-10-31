const Flight = require("../db/models/flight.model");

exports.find_flight = (req, res) => {
  let flight_number = req.query.flight_number;

  Flight.findOne({ flightNumber: flight_number }).exec((err, flight) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!flight) {
      return res.status(404).send("not found");
    }

    return res.json(flight);
  });
};

exports.find_flights = (req, res) => {
  Flight.find().exec((err, flights) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!flights) {
      return res.json([]);
    }

    return res.json(flights);
  });
};

exports.book_seat = (req, res) => {
  const user = req.user;
  const flightNumber = req.body.flightNumber;
  const seatNumber = req.body.seatNumber;

  Flight.findOne({ flightNumber: flightNumber }).exec((err, flight) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!flight) {
      return res.status(404).send("not found");
    }

    const previousSeat = flight.seats.find((seat) => seat.passenger && seat.passenger.user_id.toString() === user.id && seat.status === "unavailable");
    const selectedSeat = flight.seats.find((seat) => seat.number === seatNumber);
    console.log(`Got seat: `, selectedSeat);
    console.log("Previous seat: ", previousSeat);
    
    if (!selectedSeat || selectedSeat.status !== "available") {
      return res.status(400).send({ message: "seat unavailable" });
    }

    const seats = flight.seats.map((seat) => {
      if (seat.number === seatNumber) {
        console.log("changing seat number ", seatNumber);
        seat.status = "unavailable";
        seat.passenger = { "user_id": user.id };
      } else if (previousSeat && previousSeat.number === seat.number) {
        seat.status = "available"
        seat.passenger = null;
      }

      return seat;
    });

    flight.seats = seats;
    console.log(`Got flight: `, flight);
    flight.save((err, flight) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).json({
        message: "flight seat reserved",
      });
    });
  });
};
