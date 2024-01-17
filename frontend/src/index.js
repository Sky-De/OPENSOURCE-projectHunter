import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { NavbarBootstrap } from "./components/NavbarBS";
import App from "./App";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import EmailSent from "./pages/EmailSent";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <NavbarBootstrap />
      <Switch>
        <Route exact path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/email/:username" element={<EmailSent />} />
        <Route path="/home" element={<Home />} />
      </Switch>
    </Router>
  </React.StrictMode>
);
