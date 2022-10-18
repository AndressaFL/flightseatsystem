import './SignUp.css'
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

function SignUp(props) {

  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    /*tag name html*/
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    };

    UserService.signUp(data)
    .then(response => {
      console.log(response.data.email);
      navigate("/signin");
    })
    .catch(e => {
      console.log(e);
    });
  };
  return (
    <main className="form-signup" method="post">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <Link to="../signin" className="link-primary">Sign In</Link>
            </div>
            <div >
              <label>Full Name</label>
              <input
                type="name"
                id="name"
                name="name"
                className="form-control mt-1"
                placeholder="e.g Rafael Lazoti"
                value={inputs.name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-3">
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
                id="password"
                name="password"
                className="form-control mt-1"
                placeholder="Password"
                value={inputs.password || ""}
                onChange={handleChange}/>
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
  )
}

export default SignUp