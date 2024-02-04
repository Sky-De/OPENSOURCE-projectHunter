import React, { useState } from "react";
import "../css/SignUp.css";
import { Link, useNavigate } from "react-router-dom";

let HOST;
if (process.env.REACT_APP_NODE_ENV === "dev") {
  console.log("Welcome to Dev mode");
  HOST = "http://localhost:5000";
} else {
  HOST = "http://127.0.0.1";
}

const SignUpOne = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch(HOST + "/api/user/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
      }),
    });
    if (res.status === 200 || res.status === 201) {
      navigate(`/emailsent/${username}`);
    } else {
      console.log(res.text);
    }
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
          onChange={handleEmailInput}
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
        <p id="log-in" className="d-flex justify-content-center mt-4">
          <span>
            Already have an account ?{" "}
            <Link id="log-in" to="/">
              Log in here
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpOne;
