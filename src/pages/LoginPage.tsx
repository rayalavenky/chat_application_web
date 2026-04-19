import React from "react";
import Orbitalk from "../assets/images/Icon.png";
import TextField from "@mui/material/TextField";

const LoginPage = () => {
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
            Welcome back to{" "}
            <span className="card__title--accent">OrbiTalk.</span>
          </h1>
          <p className="card__subtitle">
            stay connected, wherever your world moves.
          </p>

          <div className="login-form">
            <div className="margin-top-1">
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                autoComplete="off"
                className="input-field"
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="password"
                type="password"
                variant="outlined"
                autoComplete="off"
                className="input-field"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
