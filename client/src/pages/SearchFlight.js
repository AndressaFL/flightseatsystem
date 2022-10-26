import React, { useState } from "react";
import FlightService from "../services/FlightService";
import "./SearchFlight.css";
import { Link, useNavigate } from "react-router-dom";
import ShowError from "../components/ShowError/ShowError";

function SearchFlight() {
  const [flightNumber, setFlightNumber] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFlightNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit called");

    FlightService.find(flightNumber)
      .then((flight) => {
        console.log("flight response is: ", flight)
        navigate("/bookseat");
      })
      .catch((e) => {
        console.log("Find flight failed: ", e);
        if (e.response.status == 401) {
          navigate("/signout");
          return;
        }

        ShowError("Flight number not found!");
      });
  };

  //JSX como o react le e tranforma elementos no DOM
  return (
    <>
      <div id="search-form">
        <div id="search">
          <h1>SEARCH YOUR FLIGHT</h1>
        </div>
        <div className="container">
          <form
            className="row row-cols-lg-auto g-3 align-items-center"
            onSubmit={handleSubmit}
          >
            <div className="col-12">
              <label className="visually-hidden" id="flight_number">
                Flight Number
              </label>
              <div className="input-group">
                <div className="input-group-text">Flight Number: </div>
                <input
                  type="text"
                  className="form-control"
                  id="flight_number"
                  placeholder=""
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchFlight;
