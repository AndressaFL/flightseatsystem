import { useContext } from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";
import { UserContext } from "../../userContext";
import { useNavigate, useParams } from "react-router-dom";
import "./Header.css";
import logo from "../../ac_logo.svg"

function Header() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  if (!state.user) {
    UserService.currentUser().then((response) => {
      dispatch({ type: "SET_USER", payload: response.data });
    });
  }
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
            src={logo}
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
