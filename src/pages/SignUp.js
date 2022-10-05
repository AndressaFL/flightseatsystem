import './SignUp.css'

import React from "react"
import { Link } from 'react-router-dom'

function SignUp(props) {
  return (
    <main className="form-signup">
      <div>
        <form>
          <div>
            <h3>Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <Link to="/signin" className="link-primary">Sign In</Link>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="e.g Rafael Lazoti"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password" />
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