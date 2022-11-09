import "./SignIn.css";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import ShowError from "../components/ShowError/ShowError";
import { UserContext } from "../userContext";

function SignIn(props) {
  /*keep user's information*/
  const [state, dispatch] = useContext(UserContext);
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

/*keep login and password information*/
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
/*function button log in*/
  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = false;
    if (!inputs.email) {
      ShowError("Email is required!");
      errors = true;
    }

    if (!inputs.password) {
      ShowError("Password is required!");
      errors = true;
    }

    if (errors) {
      return false;
    }

    const data = {
      email: inputs.email,
      password: inputs.password,
    };
    
/*requesting for the backend*/
    UserService.signIn(data)
      .then(response => UserService.currentUser())
      .then(response => {
        dispatch({ type: "SET_USER", payload: response.data });
        navigate("/searchflight");
      })
      .catch((error) => {
        ShowError("Email or password is invalid!");
        console.error("Failed to authenticate a user.", error);
      });
  };

  return (
    <main className="form-signin" method="post">
      <div>
        <form onSubmit={handleSubmit} className="row g-3 needs-validation">
          <div>
            <h3>Sign In</h3>
            <div className="text-center mb-3">
              Not registered yet?{" "}
              <Link to="../signup" className="form-group mt-3">
                Sign Up
              </Link>
            </div>
            <div>
              <label>Email address</label>

              <input
                type="email"
                id="email"
                name="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={inputs.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={inputs.password || ""}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignIn;
