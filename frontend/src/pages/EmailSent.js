import React from "react";
import { useParams } from "react-router-dom";
import "../css/EmailSent.css";
import SimpleSlider from "../components/SimpleSlider";

const Email = () => {
  const { username } = useParams();

  return (
    <div className="email-header">
      <div className="container">
        <div className="header-container d-flex justify-content-center">
          <h1 className="email-header">Email Sent</h1>
        </div>
        <h2 className="mt-5 d-flex justify-content-center">
          email sent to {username}... link expires in 30 minutes!
        </h2>
      </div>
    </div>
  );
};

export default Email;
