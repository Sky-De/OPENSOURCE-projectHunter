import React from "react";
import "../css/SignUp.css";
import SimpleSlider from "../components/SimpleSlider";

const SignUp = () => {
  return (
    <div className="register">
      <div className="container">
        <div className="header-container d-flex justify-content-center">
          <h1 className="register-header">Register</h1>
        </div>
        <SimpleSlider />
      </div>
    </div>
  );
};

export default SignUp;
