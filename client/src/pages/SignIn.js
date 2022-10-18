import "./SignIn.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

function SignIn(props) {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  /*  const handleChange = (event) => {
     name: = document.getElementBYID('').value,
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };*/

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: inputs.email,
      password: inputs.password
    };

    UserService.signIn(data)
    .then(response => {
      console.log(response.data.email);
      navigate("/searchflight");
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (
    <main className="form-signin " method="post">
      <div>
        <form onSubmit={handleSubmit} class= "row g-3 needs-validation" novalidate>
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
                required/>
  
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
