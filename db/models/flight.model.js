const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  
  flight: {
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

  arriving: {
    type: Date,
    
  },

  departing: {
    type: Date,
    default: Date.now()
    
  },
});

const Flight = mongoose.model("flight", FlightSchema);

module.exports = flight;