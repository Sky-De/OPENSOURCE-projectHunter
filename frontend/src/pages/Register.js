import React from "react";
import "../css/Register.css";
import SimpleSlider from "../components/SimpleSlider";

const register = () => {
  return (
    <div className="register">
      <div className="container">
        <h1 className="register-header d-flex justify-content-center mb-3">
          Register
        </h1>
        <SimpleSlider />
      </div>
    </div>
  );
};

export default register;
