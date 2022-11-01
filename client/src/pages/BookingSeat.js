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

  const handleCancel = () => {
    navigate("/searchflight");
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
              <ul>
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
              </ul>
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
                className="btn btn-primary btn-lg px-4 color: white"
                onClick={()=> handleCancel()}
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
              width="100%"
              height="100%"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-6 lh-1 mb-3">Seat Guide</h1>
            <p className="lead">

            <ul class="showcase">
      <li>
        <div class="seat"></div>
        <small>Available</small>
      </li>
      <li>
        <div class="seat selected"></div>
        <small>Selected</small>
      </li>
      <li>
        <div class="seat occupied"></div>
        <small>Occupied</small>
      </li>
    </ul>
<ul>
    Advance standard seat selection charges are refundable only in the following circumstances:
<li>you are moved to a seat other than the one you selected due to an involuntary schedule or airport change (e.g., flight disruption, cancellation). If you are moved from your seat for such a reason, you may request a refund of your seat charges.</li>
<li>you decide not to travel on a flight for which you purchased advance standard seat selection. The value of your advance standard seat selection charge will be retained and can be applied towards seat selection on a future Air Canada itinerary, provided you do not cancel your original booking.</li>
</ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookingSeat;
