import './BookingSeat.css';
import { useState } from "react";

function BookingSeat() {
    const [seats, setSeats] = useState({ "s1": false });

    const handleSeatClick = (event) => {
        setSeats(previousState => {
            let seatState = !previousState[event.target.id];
            previousState[event.target.id] = seatState;

            if (seatState) {
                event.target.classList.add("seat-selected");
            } else {
                event.target.classList.remove("seat-selected");
            }

            return previousState;
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="bus">
                        <div id="selectedseataDisplay">
                        </div>
                        <div className="inner">
                            <div className="leftside ">
                                <div id="s1" className="seat1" onClick={handleSeatClick}>1A</div>
                                <div id="s2" className="seat2" onClick={handleSeatClick}></div>
                                <div id="s3" className="seat3" onClick={handleSeatClick}></div>
                                <div id="s4" className="seat4" onClick={handleSeatClick}></div>
                                <div id="s5" className="seat5"></div>
                                <div id="s6" className="seat6"></div>
                                <div id="s7" className="seat7"></div>
                                <div id="s8" className="seat8"></div>
                                <div id="s9" className="seat9"></div>
                                <div id="s10" className="seat10"></div>
                                <div id="s11" className="seat11"></div>
                                <div id="s12" className="seat12"></div>
                                <div id="s13" className="seat13"></div>
                                <div id="s14" className="seat14"></div>
                                <div id="s15" className="seat15"></div>
                                <div id="s16" className="seat16"></div>
                                <div id="s17" className="seat17"></div>
                                <div id="s18" className="seat18"></div>
                                <div id="s19" className="seat19"></div>
                                <div id="s20" className="seat20"></div>
                                <div id="s21" className="seat21"></div>
                                <div id="s22" className="seat22"></div>
                                <div id="s23" className="seat23"></div>
                                <div id="s24" className="seat24"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default BookingSeat;

