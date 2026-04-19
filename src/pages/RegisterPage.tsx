import React from "react";
import Orbitalk from "../assets/images/Icon.png";
import TextField from "@mui/material/TextField";

const RegisterPage = () => {
  return (
    <>
      <main className="center">
        <div className="card">
          <div className="card__header">
            <div className="card__logo">
              <img src={Orbitalk} alt="Orbitalk" className="orbittalk-icon" />
            </div>
            <div className="card__brand-info">
              <span className="card__brand-name">ORBITALK</span>
              <span className="card__brand-sub">
                conversations that revolve around you.
              </span>
            </div>
          </div>

          <h1 className="card__title">
            Welcome to{" "}
            <span className="card__title--accent">OrbiTalk.</span>
          </h1>
          <p className="card__subtitle">
            stay connected, wherever your world moves.
          </p>

          <div className="login-form">
            <div className="margin-bottom-16">
              <TextField
                id="outlined-basic"
                label="First name"
                variant="outlined"
                className="input-field"
              />
            </div>
            <div className="margin-bottom-16">
              <TextField
                id="outlined-basic"
                label="last Name"
                variant="outlined"
                className="input-field"
              />
            </div>
            <div className="margin-bottom-16">
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                className="input-field"
              />
            </div>
            <div className="margin-bottom-16">
              <TextField
                id="outlined-basic"
                label="Mobile Number"
                type="number"
                variant="outlined"
                className="input-field"
              />
            </div>
            <div className="margin-bottom-16">
              <TextField
                id="outlined-basic"
                label="Gender"
                type="number"
                variant="outlined"
                className="input-field"
              />
            </div>
          </div>
          <div className="login-button-section">
            <button className="primary-button">Register</button>
          </div>

          <div className="card__footer">
            Already have an account?{" "}
            <a href="/" className="text-link">
              Login
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
