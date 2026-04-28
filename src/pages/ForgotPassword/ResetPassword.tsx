import React, { useState } from "react";
import Orbitalk from "../../assets/images/Icon.png";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/AuthApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const emailFromStore = useSelector(
    (state: any) => state.forgotPassword.email,
  );

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "At least 8 characters")
        .matches(/[A-Z]/, "One uppercase letter")
        .matches(/\d/, "One number")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const password = formik.values.password;
  const rules = [
    { label: "AT LEAST 8 CHARACTERS", met: password.length >= 8 },
    { label: "ONE UPPERCASE LETTER", met: /[A-Z]/.test(password) },
    { label: "ONE NUMBER", met: /\d/.test(password) },
  ];

  const handleResetPassword = async () => {
    const payload = {
      email: emailFromStore,
      password: formik.values.password,
    };
    try {
      const response = await resetPassword(payload).unwrap();
      if (response?.status === "success") {
        toast.success(response?.message);
        formik.resetForm();
        navigate("/");
      }
    } catch (err) {
      toast.error("Failed to reset password");
    }
  };

  

  return (
    <>
      <main className="center">
        <div className="card forgot-card">
          <div className="card__header">
            <div className="card__logo">
              <img src={Orbitalk} alt="Orbitalk" className="orbittalk-icon" />
            </div>
            <div className="card__brand-info">
              <span className="card__brand-name">ORBITALK</span>
              <span className="card__brand-sub">step 03 / reset</span>
            </div>
          </div>

          <h1 className="card__title forgot-card__title">
            Forge new <span className="card__title--accent">key.</span>
          </h1>
          <p className="card__subtitle">
            Choose a strong access key. You'll use this on your next orbital
            sync.
          </p>

          <form onSubmit={formik.handleSubmit} className="forgot-form">
            <div className="reset__label-row">
              <VpnKeyOutlinedIcon className="reset__label-icon" />
              <span className="forgot-form__label">NEW ACCESS KEY</span>
            </div>
            <div className="margin-top-10 margin-bottom-20">
              <TextField
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                className="input-field"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((p) => !p)}
                          edge="end"
                          className="reset__eye"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            <div className="reset__label-row">
              <span className="forgot-form__label">CONFIRM ACCESS KEY</span>
            </div>
            <div className="margin-top-10 margin-bottom-18">
              <TextField
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                className="input-field"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirm((p) => !p)}
                          edge="end"
                          className="reset__eye"
                        >
                          {showConfirm ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            <ul className="reset__rules">
              {rules.map((r) => (
                <li
                  key={r.label}
                  className={`reset__rule ${r.met ? "reset__rule--met" : ""}`}
                >
                  <CheckCircleOutlineIcon className="reset__rule-icon" />
                  <span>{r.label}</span>
                </li>
              ))}
            </ul>

            <button
              type="submit"
              className="recovery-button primary-button margin-top-24"
              onClick={() => handleResetPassword()}
            >
              <span>Reset access key</span>
              <ArrowForwardIcon fontSize="small" />
            </button>
          </form>

          <div className="card__footer">
            Changed your mind?{" "}
            <a
              href="/"
              className="text-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Return to login
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResetPassword;
