import { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Login from "./pages/Login";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
};

export default App;
