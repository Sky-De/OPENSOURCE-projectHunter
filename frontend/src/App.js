import { useState } from "react";

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
      body: JSON.stringify({username: username, password: password}),
    })
    const data = await response.json()
    setText(`Created ${data.username}`)
  }

  async function login() {
    const response = await fetch(userEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username, password: password}),
    })
    const data = await response.json()
    setText(`Welcome ${data.username}`)
  }

  async function logout() {
    const response = await fetch(userEndpoint, { method: "DELETE" });
    const data = await response.json();
    setText(data.message);
  }

  return (
    <div className="App">
      <h4>Username</h4>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <h4>Password</h4>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={getUser}>Get User Info</button> <br />
      <button onClick={createUser}>Create a User</button> <br />
      <button onClick={login}>Login</button> <br />
      <button onClick={logout}>Logout</button> <br />
      <h1>{text}</h1>
    </div>
  );
}

export default App;
