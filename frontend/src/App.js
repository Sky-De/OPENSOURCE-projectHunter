import { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";

function App() {
  let userEndpoint = "http://localhost:4000/user";

  const [text, setText] = useState("Placeholder");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function getUser() {
    const response = await fetch(userEndpoint);
    const data = await response.json();
    setText(data.message);
  }

  async function createUser() {
    const response = await fetch(userEndpoint, {
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
    const response = await fetch(userEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = await response.json();
    setText(`Welcome ${data.username}`);
  }

  async function logout() {
    const response = await fetch(userEndpoint, { method: "DELETE" });
    const data = await response.json();
    setText(data.message);
  }

  return (
    <div className="App">
      <div className="split left">
        <div className="centered">
          <h1 className="mb-4">Login</h1>
          <div>
            <i className="fa-solid fa-user mr-2"></i>
            <input
              className="mb-2"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <br />
            <i className="fa-solid fa-lock mr-2"></i>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <br />
          <div className="mb-2">
            <div className="mb-1">
            <button className="login-form button-styled mr-1" onClick={login}>
              Login
            </button>
            <br />
          </div>
            <Link to='/register' onClick={createUser}>
              <button className="login-form button-styled">Create a User</button>
            </Link>
            <br />
          </div>
        </div>
      </div>

      <div className="split right d-none d-md-block">
        <div className="centered">
          <img
            src={process.env.PUBLIC_URL + "/dating2.svg"}
            alt="Couple dating SVG"
            width="400"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
