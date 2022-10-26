const Flight = require("../db/models/flight.model");

exports.find_flight = (req, res) => {
  let flight_number = req.query.flight_number;

  Flight.findOne({flightNumber: flight_number}).exec((err, flight) => {
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