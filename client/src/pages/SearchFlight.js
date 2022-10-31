import React, { useEffect, useState } from "react";
import FlightService from "../services/FlightService";
import "./SearchFlight.css";
import { useNavigate } from "react-router-dom";


function SearchFlight() {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  const formatDate = (date) => {
    console.log("got date ", date);
    const formattedDate = new Date(date).toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
    console.log("formatted date ", formattedDate);
    return formattedDate;
  };

  const handleOnClick = (flightNumber) => {
    navigate(`/bookseat/${flightNumber}`);
  };

  useEffect(() => {
    FlightService.find_all()
      .then((response) => {
        /*save flight inf*/
        setFlights(response.data);
      })
      .catch((e) => {
        console.log("Find flights failed: ", e);
        if (e.response.status === 401) {
          navigate("/signout");
          return;
        }
      });
  }, []);

 

  /*JSX como o react le e tranforma elementos no DOM*/
  return (
    <>
      <div id="search-form">
        <div id="search">
          <h1>SEARCH YOUR FLIGHT</h1>
        </div>
        <div className="container">
          <h1>Flights</h1>
          <table className="rwd-table center">
            <thead>
            <tr>
              <th>Flights</th>
              <th>From</th>
              <th>To</th>
              <th>Departing Time</th>
              <th>Arriving Time</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {flights.map((flight) => (
                <tr key={flight.flightNumber}>
                <td data-th="Flight Number">{flight.flightNumber}</td>
                <td data-th="From">{flight.from}</td>
                <td data-th="To">{flight.to}</td>
                <td data-th="Departing Time">{formatDate(flight.departingDate)}</td>
                <td data-th="Arriving Time">{formatDate(flight.arrivingDate)}</td>
                <td data-th="Choose your Seat">
                  <button
                    onClick={() => handleOnClick(flight.flightNumber)}
                    className="btn btn-primary"
                  >
                    Choose your seat
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SearchFlight;
