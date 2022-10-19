import "./BookingSeat.css";
import { useState } from "react";

function BookingSeat() {
  const [seats, setSeats] = useState([
    { id: "s1", status: "available", position: "left", number: "1A" },
    { id: "s2", status: "unavailable", position: "left", number: "1B" },
    { id: "s3", status: "available", position: "left", number: "1C" },
    { id: "s4", status: "available", position: "left", number: "2A" },
    { id: "s5", status: "available", position: "left", number: "2B" },
    { id: "s6", status: "available", position: "left", number: "2C" },
    { id: "s7", status: "available", position: "left", number: "3A" },
    { id: "s8", status: "available", position: "left", number: "3B" },
    { id: "s9", status: "available", position: "left", number: "3C" },
    { id: "s10", status: "available", position: "left", number: "4A" },
    { id: "s11", status: "available", position: "left", number: "4B" },
    { id: "s12", status: "available", position: "left", number: "4C" },
    { id: "s13", status: "available", position: "left", number: "5A" },
    { id: "s14", status: "available", position: "left", number: "5B" },
    { id: "s15", status: "available", position: "left", number: "5C" },
    { id: "s16", status: "available", position: "left", number: "6A" },
    { id: "s17", status: "available", position: "left", number: "6B" },
    { id: "s18", status: "available", position: "left", number: "6C" },
    { id: "s19", status: "available", position: "right", number: "1D" },
    { id: "s20", status: "available", position: "right", number: "1E" },
    { id: "s21", status: "available", position: "right", number: "1F" },
    { id: "s22", status: "unavailable", position: "right", number: "2D" },
    { id: "s23", status: "available", position: "right", number: "2E" },
    { id: "s24", status: "available", position: "right", number: "2F" },
    { id: "s25", status: "unavailable", position: "right", number: "3D" },
    { id: "s26", status: "available", position: "right", number: "3E" },
    { id: "s27", status: "unavailable", position: "right", number: "3F" },
    { id: "s28", status: "available", position: "right", number: "4D" },
    { id: "s29", status: "available", position: "right", number: "4E" },
    { id: "s30", status: "unavailable", position: "right", number: "4F" },
    { id: "s31", status: "unavailable", position: "right", number: "5D" },
    { id: "s32", status: "available", position: "right", number: "5E" },
    { id: "s33", status: "unavailable", position: "right", number: "5F" },
    { id: "s34", status: "available", position: "right", number: "6D" },
    { id: "s35", status: "available", position: "right", number: "6E" },
    { id: "s36", status: "unavailable", position: "right", number: "6F" },
  ]);
  //const [unavailableSeats, setUnavailableSeats] = useState({ s3: true })

  //document.querySelector("#s1").classList.add('seat-occupied');

  const handleSeatClick = (event) => {
    setSeats((previousState) => {
      return previousState.map((seat) => {
        if (seat.id === event.target.id) {
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
                        key={seat.id}
                        id={seat.id}
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
                      key={seat.id}
                      id={seat.id}
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
          <h1 className=" lh-1 mb-3"> Seat Information</h1>
            <p>
              Or, keep it light and add a border for some added definition to
              the boundaries of your content. Be sure to look under the hood at
              the source HTML here as we've adjusted the alignment and sizing of
              both column's content for equal-height.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
              <button type="button" className="btn btn-primary btn-lg px-4 me-sm-3">
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4"
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
        <img src="/images/background.jpeg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 lh-1 mb-3">Seat Guide</h1>
        <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
        
      </div>
    </div>
  </div>
    </div>

    
  );
}
export default BookingSeat;
