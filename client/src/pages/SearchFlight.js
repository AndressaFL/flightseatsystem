import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import "./SearchFlight.css";

function SearchFlight() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state || !state.user) {
      navigate("/home");
    }
  });

  //JSX como o react le e tranforma elementos no DOM
  return (
    <>
      <div id="search-form">
        <div id="search">
          <h1>SEARCH YOUR FLIGHT</h1>
        </div>
        <section>
          <div className="flight" id="flightbox">
            <form id="flight-form">
              <div id="flight-info">
                <div className="info-box">
                  <label form="adults">FLIGHT</label>
                  <select name="adults" id="adults">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>

                <div id="flight-dates">
                  <div className="info-box">
                    <label form="">FROM</label>
                    <input type="text" id="leave-date" readOnly />
                  </div>
                </div>
                <div id="flight-dates">
                  <div className="info-box">
                    <label form="">TO</label>
                    <input type="text" id="leave-date" readOnly />
                  </div>
                </div>
                <div id="flight-dates">
                  <div className="info-box" id="arrive-box">
                    <label form="">ARRIVING</label>
                    <input type="text" id="dep-to" readOnly />
                  </div>
                </div>
                <div id="flight-dates">
                  <div className="info-box">
                    <label form="">DEPARTING</label>
                    <input type="text" id="leave-date" readOnly />
                  </div>
                </div>
              </div>
              <div id="flight-search">
                <div className="info-box">
                  <input type="submit" id="search-flight" value="SEARCH" />
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
      <div id="confirm"></div>
    </>
  );
}
export default SearchFlight;
