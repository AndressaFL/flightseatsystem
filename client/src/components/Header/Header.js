import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../userContext";
import "./Header.css";

function Header() {
  const [state, dispatch] = useContext(UserContext);
  let link = (
    <Link className="me-3 py-2 text-dark text-decoration-none text" to="signin">
      Sign In
    </Link>
  );

  if (state.user) {
    link = (
      <>
        <Link
          className="me-3 py-2 text-dark text-decoration-none"
          to="searchflight"
        >
          Search Flight
        </Link>
        <Link className="me-3 py-2 text-dark text-decoration-none" to="chat">
          Chat
        </Link>
        <Link
          className="me-3 py-2 text-dark text-decoration-none text"
          to="signout"
        >
          Sign Out
        </Link>
      </>
    );
  }

  //JSX como o react le e tranforma elementos no DOM
  return (
    <header>
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 border-bottom">
        <Link
          to="home"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <img
            width="230"
            height="30"
            className="ac-logo-image"
            alt="Air Canada"
            src="https://content.achome.digital.aircanada.com/ac/applications/homepage/content/1.0.1009/assets/img/logos/ac/ac_logo.svg"
          />
        </Link>
        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <Link className="me-3 py-2 text-dark text-decoration-none" to="home">
            Home
          </Link>
          {link}
        </nav>
      </div>
    </header>
  );
}
export default Header;
