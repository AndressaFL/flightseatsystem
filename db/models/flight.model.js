const mongoose = require("mongoose");

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
    default: Date.now()
    
  },

  departingDate: {
    type: Date,
    default: Date.now()
    
  },
});

const Flight = mongoose.model("flights", FlightSchema);

module.exports = Flight;