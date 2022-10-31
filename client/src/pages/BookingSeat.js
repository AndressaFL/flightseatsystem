import "./BookingSeat.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FlightService from "../services/FlightService";
import { UserContext } from "../userContext";
import ShowError from "../components/ShowError/ShowError";

function BookingSeat() {
  const [seats, setSeats] = useState([]);
  const [flight, setFlight] = useState({});/*object*/
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const { flightNumber } = useParams();
  /*
  request param value
  Example: http://localhost:3000/bookseat/5567
  flightNumber = 5567
  */

  useEffect(() => {
    console.log("getting current flight!");
    FlightService.find(flightNumber)
      .then((response) => {
        console.log(response.data);
        const s = response.data.seats.map(seat => {
          if (seat.status === "unavailable" && seat.passenger.user_id === state.user.id) {
            seat.status = "selected";
          }
          return seat;
        });

        setFlight(response.data);/*save the flight*/
        setSeats(s);/*all seats*/
      })
      .catch((e) => {
        console.log("Find flight failed: ", e);
        if (e.response.status === 401) {
          navigate("/signout");
          return;
        }
      });
  }, []);

  const handleSeatClick = (event) => {
    console.log("handleSeatClick called. target: ", event.target);
    setSeats((previousState) => {
      return previousState.map((seat) => {
        if (seat.status === "selected") {
          return { ...seat, status: "available" };
        } else if (seat.number === event.target.id) {
          if (seat.status === "available") {
            return { ...seat, status: "selected" };
          } else if (seat.status === "selected") {
            return { ...seat, status: "available" };
          } else {
            return seat;
          }
        } else {
          return seat;
        }
      });
    });
  };

  const confirmSeatSelection = (event) => {
    console.log("confirmSeatSelection called.");
    const selectedSeat = seats.find((seat) => seat.status === "selected");
    FlightService.book_seat(flight.flightNumber, selectedSeat.number)
    /*Save both in the backend8*/
    .then((response) => {
      console.log(response.data);
      alert("Seat reserved");
    })
    .catch((e) => {
      console.log("Find flight failed: ", e);
      if (e.response.status === 401) {
        navigate("/signout");
        return;
      } else if (e.response.status === 400) {
        ShowError("Selected seat is unavailable");
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="bus">
            <div id="selectedseataDisplay"></div>
            <div className="inner">
              <div className="leftside">
                {seats
                  .filter((seat) => seat.position === "left")
                  .map((seat, index) => {
                    return (
                      <div
                        key={seat.number}
                        id={seat.number}
                        className={seat.status}
                        onClick={handleSeatClick}
                      >
                        {seat.number}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="rightside">
              {seats
                .filter((seat) => seat.position === "right")
                .map((seat, index) => {
                  return (
                    <div
                      key={seat.number}
                      id={seat.number}
                      className={seat.status}
                      onClick={handleSeatClick}
                    >
                      {seat.number}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="h-100 p-4 bg-light border rounded-3 display-7">
            <h1 className="display-6 lh-1 mb-3 "> Seat Information</h1>
            <div className="lead">
              <ol>
                <li>Passenger's name: {state.user.name}</li>
                <li>Flight number: {flight.flightNumber}</li>
                <li>From: {flight.from}</li>
                <li>To: {flight.to}</li>
                <li>
                  Seat Selected:
                  {seats
                    .filter((seat) => seat.status === "selected" || (seat.status === "unavailable" && seat.passenger.user_id === state.user.id))
                    .map((seat, index) => `${seat.number}`)}
                </li>
              </ol>
            </div>

            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-sm-3"
                onClick={() => confirmSeatSelection()}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-lg px-4 color: white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="/images/background.jpeg"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-6 lh-1 mb-3">Seat Guide</h1>
            <p className="lead">
              Quickly design and customize responsive mobile-first sites with
              Bootstrap, the world’s most popular front-end open source toolkit,
              featuring Sass variables and mixins, responsive grid system,
              extensive prebuilt components, and powerful JavaScript plugins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookingSeat;
