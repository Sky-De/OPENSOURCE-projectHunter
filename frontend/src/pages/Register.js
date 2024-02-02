import React from "react";
import "../css/Register.css";
import SimpleSlider from "../components/SimpleSlider";

const Register = () => {
  return (
    <div className="register">
      <div id="register-container" className="container">
        <div id="header-container" className="d-flex justify-content-center">
          <h1 id="register-header">Fill out your info</h1>
        </div>
        <SimpleSlider />
      </div>
    </div>
  );
};

export default Register;
