import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="row">
        <div className="col-12 col-md">
          <div className="container home">
            <h2>It’s more than just a trip.</h2>
            <h2 className="information">
              Advance Seat Selection
              <br />
              Looking for an aisle or window seat? You can always select your
              seat free of charge.
              <br />
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
