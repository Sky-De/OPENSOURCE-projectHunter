import React, { useState } from "react";
import "../css/SignUp.css";
import { Link, useNavigate } from "react-router-dom";

const SignUpOne = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/emailsent/${username}`);
  };

  return (
    <div className="signupone">
      <div id="signupone-box">
        <h1 id="signupone-header" className="d-flex justify-content-center">
          Sign Up Here
        </h1>
        <label htmlFor="signupone-email">EMAIL</label>
        <br />
        <input
          id="signupone-email"
          className="register-user mb-2"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleUsernameInput}
        />
        <br />
        <label htmlFor="signupone-user">USER</label>
        <br />
        <input
          id="signupone-user"
          className="register-user mb-2"
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameInput}
        />
        <br />
        <div className="d-flex justify-content-center mt-4">
          <Link onClick={handleSubmit}>
            <button id="signupone-btn">Submit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpOne;
