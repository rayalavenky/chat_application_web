import React from "react";
import Orbitalk from "../../assets/images/Icon.png";
import { TextField } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../services/AuthApi";
import { useDispatch } from "react-redux";
import { setEmail } from "../../store/forgotEmailSlice";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleForgotPassword = async () => {
    console.log(formik.values, "dtfghj");
    dispatch(setEmail(formik.values.email));

    try {
      const response = await forgotPassword(formik.values).unwrap();
      if (response?.status === "success") {
        toast.success(response?.message);
        formik.resetForm();
        navigate("/verify-otp");
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
              <span className="card__brand-sub">step 01 / recovery</span>
            </div>
          </div>

          <h1 className="card__title forgot-card__title">
            Lost your <span className="card__title--accent">key.</span>
          </h1>
          <p className="card__subtitle">
            Transmit your node identifier and we'll dispatch a one-time recovery
            code to your inbox.
          </p>

          <form onSubmit={formik.handleSubmit} className="forgot-form">
            <div className="margin-top-10 margin-bottom-24">
              <TextField
                label="Email"
                name="email"
                type="email"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                className="input-field"
              />
            </div>

            <button
              type="submit"
              className="recovery-button primary-button"
              onClick={() => handleForgotPassword()}
            >
              <span>Send recovery code</span>
              <ArrowForwardIcon fontSize="small" />
            </button>

            <button
              type="button"
              className="back-to-login"
              onClick={() => navigate("/")}
            >
              <ArrowBackIcon fontSize="small" />
              <span>BACK TO LOGIN</span>
            </button>
          </form>

          <div className="card__footer">
            Remembered it?{" "}
            <a href="/" className="text-link">
              Return to login
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
