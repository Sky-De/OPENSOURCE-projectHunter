import React from "react";
import { useParams } from "react-router-dom";
import "../css/EmailSent.css";

const EmailSent = () => {
  const { username } = useParams();

  return (
    <div className="emailsent">
      <div id="sent-message" className="container">
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

export default EmailSent;
