import React, { useEffect, useRef, useState } from "react";
import Orbitalk from "../../assets/images/Icon.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation, useVerifyOTPMutation } from "../../services/AuthApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OTP_LENGTH = 6;
const INITIAL_SECONDS = 37;

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState<number>(INITIAL_SECONDS);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const emailFromStore = useSelector(
    (state: any) => state.forgotPassword.email,
  );
  const [forgotPassword, { isLoading : forgotPasswordLoading }] = useForgotPasswordMutation();

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");
    if (!pasted.length) return;
    const next = Array(OTP_LENGTH).fill("");
    pasted.forEach((d, i) => (next[i] = d));
    setOtp(next);
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  const handleResend = () => {
    setSecondsLeft(INITIAL_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
    handleForgotPassword();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP:", otp.join(""));
  };

  const isExpired = secondsLeft === 0;

  const handleVerifyOTP = async () => {
    const payload = {
      email: emailFromStore, // Fallback to location state if store is empty
      otp: otp.join(""),
    };
    try {
      const response = await verifyOTP(payload).unwrap();
      if (response?.status === "success") {
        toast.success(response?.message);
        navigate("/reset-password");
      }
    } catch (err) {
      toast.error("Failed to verify OTP");
    }
  };

    const handleForgotPassword = async () => {  
      try {
        const response = await forgotPassword({email : emailFromStore}).unwrap();
        if (response?.status === "success") {
          toast.success(response?.message);
        }
      } catch (err) {
        toast.error("Failed to send recovery code");
      }
    };

  return (
    <>
    <header className="topbar">
            <div className="topbar__brand">
              <img src={Orbitalk} alt="Orbitalk" className="topbar_icon" />
              ORBITALK
            </div>
          </header>
      <main className="center">
        <div className="card forgot-card">
          <div className="card__header">
            <div className="card__logo">
              <img src={Orbitalk} alt="Orbitalk" className="orbittalk-icon" />
            </div>
            <div className="card__brand-info">
              <span className="card__brand-name">ORBITALK</span>
              <span className="card__brand-sub">step 02 / verify</span>
            </div>
          </div>

          <h1 className="card__title forgot-card__title">
            Confirm <span className="card__title--accent">signal.</span>
          </h1>
          <p className="card__subtitle">
            We transmitted a 6-digit code to{" "}
            <span className="verify__highlight">your inbox</span>. Enter it
            below to authenticate.
          </p>

          <form onSubmit={handleSubmit} className="forgot-form">
            <div className="verify__label-row">
              <ShieldOutlinedIcon className="verify__label-icon" />
              <span className="forgot-form__label">RECOVERY CODE</span>
            </div>

            <div className="otp-group" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="otp-group__input"
                />
              ))}
            </div>

            <div className="verify__meta">
              <span className="verify__expires">
                EXPIRES IN <strong>{formatTime(secondsLeft)}</strong>
              </span>
              <button
                type="button"
                className="verify__resend"
                onClick={handleResend}
                disabled={!isExpired}
              >
                Resend code
              </button>
            </div>

            <button
              type="submit"
              className="recovery-button margin-top-24 primary-button "
              onClick={() => handleVerifyOTP()}
            >
              <span>Verify code</span>
              <ArrowForwardIcon fontSize="small" />
            </button>
          </form>

          <div className="card__footer">
            Wrong address?{" "}
            <a
              href="/forgot-password"
              className="text-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/forgot-password");
              }}
            >
              Re-enter identifier
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default VerifyOTP;
