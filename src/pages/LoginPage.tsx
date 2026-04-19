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
            <div className="margin-bottom-16">
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
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
          <div className="margin-top-16 remember-me-section">
            <div>
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                value="remember-me"
                className="input-checkbox"
              />
              <label
                htmlFor="remember-me"
                className="input-label padding-left-8"
              >
                Remember me
              </label>
            </div>
            <div>
              <a href="/forgot-password" className="text-link">Forgot password?</a>
            </div>
          </div>
          <div className="login-button-section">
            <button className="primary-button">Login</button>
          </div>

          <div className="card__footer">
            Don't have an account?{" "}
            <a href="/register" className="text-link">
              Register Now
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
