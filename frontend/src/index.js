import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import EmailSent from "./pages/EmailSent";
import { NavbarBootstrap } from "./components/NavBarBS";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <NavbarBootstrap />
      <Switch>
        <Route exact path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email/:username" element={<EmailSent />} />
      </Switch>
    </Router>
  </React.StrictMode>
);
