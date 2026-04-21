import React from "react";
import Orbitalk from "../assets/images/Icon.png";
import TextField from "@mui/material/TextField";
import { useRegisterMutation } from "../services/AuthApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      age: "",
    },
    validationSchema: Yup.object({
  firstName: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(10, "Maximum 10 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(10, "Maximum 10 characters")
    .required("Last name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number")
    .required("Phone number is required"),

  age: Yup.number()
    .typeError("Age must be a number")
    .min(18, "You must be at least 18 years old")
    .max(120, "Enter a valid age")
    .required("Age is required"),
}),

    onSubmit: async (values) => {
      const payload = {
        ...values,
        age: Number(values.age),
      };
      try {
        await register(payload).unwrap();
        toast.success("Registered successfully");
        formik.resetForm();
        navigate("/");
      } catch (err) {
        toast.error("Registration failed");
      }
    },
  });

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
            Welcome to <span className="card__title--accent">OrbiTalk.</span>
          </h1>
          <p className="card__subtitle">
            stay connected, wherever your world moves.
          </p>

          <form onSubmit={formik.handleSubmit} className="login-form">
            <div className="margin-bottom-16">
              <TextField
                label="First Name"
                name="firstName"
                autoComplete="off"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                className="input-field"
                slotProps={{
                  htmlInput: {
                    minLength: 3,
                    maxLength: 10,
                  },
                }}
              />
            </div>

            <div className="margin-bottom-16">
              <TextField
                label="Last Name"
                name="lastName"
                autoComplete="off"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                className="input-field"
                slotProps={{
                  htmlInput: {
                    minLength: 3,
                    maxLength: 10,
                  },
                }}
              />
            </div>

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

            <div className="margin-bottom-16">
              <TextField
                label="Phone Number"
                name="phoneNumber"
                autoComplete="off"
                type="number"
                value={formik.values.phoneNumber}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  formik.setFieldValue("phoneNumber", digits);
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                className="input-field"
              />
            </div>

            <div className="margin-bottom-16">
              <TextField
                label="Age"
                name="age"
                type="number"
                value={formik.values.age}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 3);
                  formik.setFieldValue("age", digits);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
                className="input-field"
              />
            </div>

            {/* ✅ MOVE BUTTON INSIDE FORM */}
            <div className="login-button-section">
              <button
                className="primary-button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
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
