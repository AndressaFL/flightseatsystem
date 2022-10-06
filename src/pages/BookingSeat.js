import "./BookingSeat.css";
import { useState } from "react";

function BookingSeat() {
  const [seats, setSeats] = useState([
    { id: "s1", status: "available", position: "left" , number: "1A"},
    { id: "s2", status: "unavailable", position: "left" },
    { id: "s3", status: "available", position: "left" },
    { id: "s4", status: "available", position: "left" },
    { id: "s5", status: "available", position: "left" },
    { id: "s6", status: "available", position: "left" },
    { id: "s7", status: "available", position: "left" },
    { id: "s8", status: "available", position: "left" },
    { id: "s9", status: "available", position: "left" },
    { id: "s10", status: "available", position: "left" },
    { id: "s11", status: "available", position: "left" },
    { id: "s12", status: "available", position: "left" },
    { id: "s13", status: "available", position: "right" },
    { id: "s14", status: "available", position: "right" },
    { id: "s15", status: "available", position: "right" },
    { id: "s16", status: "unavailable", position: "right" },
    { id: "s17", status: "available", position: "right" },
    { id: "s18", status: "available", position: "right" },
    { id: "s19", status: "unavailable", position: "right" },
    { id: "s20", status: "available", position: "right" },
    { id: "s21", status: "unavailable", position: "right" },
    { id: "s22", status: "available", position: "right" },
    { id: "s23", status: "available", position: "right" },
    { id: "s24", status: "unavailable", position: "right" },
  ]);
  //const [unavailableSeats, setUnavailableSeats] = useState({ s3: true })

  //document.querySelector("#s1").classList.add('seat-occupied');

  const handleSeatClick = (event) => {
    setSeats((previousState) => {
      return previousState.map((seat) => {
        if (seat.id == event.target.id) {
          if (seat.status == "available") {
            return { ...seat, status: "selected" };
          } else if (seat.status == "selected") {
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="bus">
            <div id="selectedseataDisplay"></div>
            <div className="inner">
              <div className="leftside">
                {seats
                  .filter((seat) => seat.position == "left")
                  .map((seat, index) => {
                    return (
                      <div
                        key={seat.id}
                        id={seat.id}
                        className={seat.status}
                        onClick={handleSeatClick}
                      >{seat.number}</div>
                    );
                  })}
              </div>
            </div>

            <div className="rightside">
              {seats
                .filter((seat) => seat.position == "right")
                .map((seat, index) => {
                  return (
                    <div
                      key={seat.id}
                      id={seat.id}
                      className={seat.status}
                      onClick={handleSeatClick}
                    ></div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookingSeat;
