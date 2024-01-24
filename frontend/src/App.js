import { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";

function App() {
  let userEndpoint = "http://localhost:5000";

  const [text, setText] = useState("Placeholder");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function getUser() {
    const response = await fetch(userEndpoint);
    const data = await response.json();
    setText(data.message);
  }

  async function createUser() {
    const response = await fetch(userEndpoint + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = await response.json();
    setText(`Created ${data.username}`);
  }

  async function login() {
    const response = await fetch(userEndpoint + "/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = await response.json();
    setText(`Welcome ${data.username}`);
  }

  return (
    <div className="App">
      <div id="login-box">
        <h1 id="login-heading">Log In</h1>

        <div id="login-input">
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-user mr-2"></i>
            <input
              id="login-user"
              className="mb-2"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-lock mr-2"></i>
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label
            id="remember-me"
            className="form-check-label"
            for="flexCheckDefault"
          >
            Remember me
          </label>
        </div>

        <div className="mb-3">
          <button id="login-form-btn" onClick={login}>
            Log In
          </button>
          <br />
        </div>

        <div id="alt-login-container">
          <p id="alt-login">
            <span>Or login with</span>
          </p>
        </div>

        <div className="d-flex justify-content-center mb-3">
          <div id="circle" className="mr-3">
            <a href="/">
              <i className="fa-brands fa-google mt-1"></i>
            </a>
          </div>
          <div id="circle">
            <a href="/">
              <i className="fa-brands fa-facebook mt-1"></i>
            </a>
          </div>
          <div id="circle" className="ml-3">
            <a href="/">
              <i className="fa-brands fa-twitter mt-1"></i>
            </a>
          </div>
        </div>

        <p id="sign-up" className="d-flex justify-content-center">
          <span>
            Not a member?{" "}
            <Link id="sign-up" to="/register" onClick={createUser}>
              Sign up now
            </Link>
          </span>
        </p>
      </div>
      <div id="spacer"></div>
    </div>
  );
}

export default App;
