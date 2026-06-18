import React, { useState } from "react";
import Orbitalk from "../assets/images/Icon.png";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../services/AuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import Loader from "../components/Loader";
import { connectSocket } from "../services/socket";

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await login(values).unwrap();
        console.log(response,'-------------------------response')
        if (response?.status === "success") {
          dispatch(
            setUser({
              userData: response?.data,
              accessToken: response?.data?.accessToken,
              refreshToken: response?.data?.refreshToken,
            }),
          );
          connectSocket(response?.data?.id);
          toast.success(response?.message);

          formik.resetForm();
          const role = response?.data?.role;
          if (role === "ADMIN") {
            navigate("/user/users");
          } else {
            navigate("/user/chat");
          }
        }
      } catch (err) {
        toast.error("Login failed");
      }
    },
  });
  return (
    <>
      {isLoading && <Loader />}
      <header className="topbar">
        <div className="topbar__brand">
          <img src={Orbitalk} alt="Orbitalk" className="topbar_icon" />
          ORBITALK
        </div>
      </header>
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

          <form onSubmit={formik.handleSubmit} className="login-form">
            <div className="margin-bottom-16">
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
            <div>
              <TextField
                id="outlined-basic"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
                autoComplete="off"
                className="input-field"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePassword}
                          edge="end"
                          style={{ color: "white" }}
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
                <a href="/forgot-password" className="text-link">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="login-button-section">
              <button className="primary-button" type="submit">
                Login
              </button>
            </div>
          </form>

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
