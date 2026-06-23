import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BoltIcon from "@mui/icons-material/Bolt";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CustomModal from "../../components/commons/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserData, useUpdateUserProfileMutation, useGetUserByIdQuery } from "../../services/userApi";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../services/AuthApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { disconnectSocket } from "../../services/socket";


const Profile = () => {
  const navigate = useNavigate();
  const loginUserID = useSelector((state: any) => state.user.userData?.id);
  const { data: userProfileResponse , isLoading: isFetchingProfile} = useGetUserByIdQuery(
    { id: loginUserID },
    { skip: !loginUserID , refetchOnMountOrArgChange: true }
  );
  const [logoutUser , { isLoading: isLoggingOut }] = useLogoutMutation();
  const [userProfileUpdate, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [open, setOpen] = useState<boolean>(false);
  const profile: UserData = userProfileResponse?.data ?? ({} as UserData);


  const constellations = [
    {
      icon: <RocketLaunchIcon />,
      title: "Founding Orbiter",
      desc: "Joined in the first cohort",
      gradient: "linear-gradient(135deg, #ff7a59, #726d6c)",
    },
    {
      icon: <BoltIcon />,
      title: "Lightspeed",
      desc: "1000 messages in a single day",
      gradient: "linear-gradient(135deg, #7c4dff, #4527a0)",
    },
    {
      icon: <EnergySavingsLeafIcon />,
      title: "Galaxy Brain",
      desc: "Started 10 channels",
      gradient: "linear-gradient(135deg, #26c6da, #00838f)",
    },
    {
      icon: <AutoAwesomeIcon />,
      title: "Stargazer",
      desc: "90-day streak",
      gradient: "linear-gradient(135deg, #ab47bc, #4a148c)",
    },
  ];

  const handleEditProfile = () => {
    setOpen(true);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    email: profile?.email || "",
    phoneNumber: profile?.phoneNumber || "",
    age: profile?.age || "",
    bio: profile?.bio || "",
  },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string().matches(/^[0-9]{10}$/, "Invalid phone number"),
      age: Yup.number().min(0, "Age must be a positive number").optional(),
      bio: Yup.string()
        .max(300, "Bio must be at most 300 characters")
        .optional(),
    }),

    onSubmit: async (values) => {
      try {
        const response = await userProfileUpdate({
          ...values,
          age: values.age === "" ? undefined : Number(values.age),
        }).unwrap();
        toast.success(response?.message || "Profile updated successfully");
        setOpen(false);
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update profile");
      }
    },
  });

  const handleEditProfileBody = () => {
    return (
      <>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ padding: "10px" }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
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
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  className="input-field"
                  slotProps={{
                    htmlInput: {
                      minLength: 3,
                      maxLength: 10,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
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
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
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
                  disabled={true}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="off"
                  type="number"
                  value={formik.values.phoneNumber}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  className="input-field"
                  disabled={true}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Age"
                  name="age"
                  type="number"
                  value={formik.values.age}
                  onChange={(e) => {
                    const digits = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 3);
                    formik.setFieldValue("age", digits);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                  className="input-field"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Bio"
                  name="bio"
                  multiline
                  rows={4}
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                  className="input-field"
                />
              </Grid>
              <Grid
                size={{ xs: 12, sm: 12 }}
                sx={{ textAlign: "right", marginTop: "8px" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginRight: "10px" }}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setOpen(false)}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </>
    );
  };

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap(); // token still exists here
    } catch (err) {
      console.log("Logout error", err);
    } finally {
      disconnectSocket(); // stop reconnects + events for the logged-out user
      sessionStorage.clear(); // clear AFTER request
      navigate("/");
    }
  };

  return (
    <>
    {(isFetchingProfile || isUpdating || isLoggingOut) && <Loader />}
      <Box className="profile">
        <Box className="profile_header">
          {/* <Box className="profile_header_cover" /> */}

          <Box className="profile_header_content">
            <Box className="profile_header_avatar">
              {`${profile.firstName?.[0] ?? ""}${
                profile.lastName?.[0] ?? ""
              }`.toUpperCase() || "?"}
              <span className="status"></span>
            </Box>

            <Box className="profile_header_body">
              <Box className="profile_header_left">
                <Box className="profile_header_info">
                  <Typography className="title">
                    {`${profile.firstName ?? ""} ${
                      profile.lastName ?? ""
                    }`.trim() || "—"}
                  </Typography>
                  <Typography className="username">
                    {profile.email
                      ? `@${profile.email.split("@")[0]}`
                      : ""}
                  </Typography>
                  <Typography className="desc">
                    {profile.bio ||
                      "Building tools that bring distant minds into the same orbit."}
                  </Typography>

                  <Box className="chips">
                    <span className="chip online">
                      <span className="dot" /> Online
                    </span>
                    <span className="chip">
                      <PublicIcon fontSize="inherit" /> Sector 7
                    </span>
                    <span className="chip">
                      <CalendarMonthIcon fontSize="inherit" /> Joined Mar 2025
                    </span>
                  </Box>
                </Box>
              </Box>

              <Box className="profile_header_actions">
                <Button
                  variant="outlined"
                  className="profile_header_actions_message"
                >
                  Message
                </Button>
                <Button
                  variant="contained"
                  className="profile_header_actions_editProfile"
                  onClick={handleEditProfile}
                >
                  Edit profile
                </Button>
                <Button
                  variant="outlined"
                  className="profile_header_actions_message"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* TELEMETRY */}
        <Box className="telemetry_section">
          <Typography className="section_title">TELEMETRY</Typography>

          <Grid container spacing={3}>
            {[
              { value: "12,481", label: "SIGNALS SENT" },
              { value: "23", label: "CHANNELS" },
              { value: "4", label: "CONSTELLATIONS" },
              { value: "342d", label: "UPTIME" },
            ].map((item) => (
              <Grid size={{ xs: 12, md: 3 }} key={item.label}>
                <Box className="telemetry_card">
                  <Typography className="value">{item.value}</Typography>
                  <Typography className="label">{item.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* TWO COLUMN: ABOUT + CONSTELLATIONS */}
        <Grid container spacing={3} className="profile_split">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box className="box about">
              <Typography className="about_title">ABOUT</Typography>

              {[
                { label: "Email", value: profile.email || "—" },
                { label: "Phone", value: profile.phoneNumber || "—" },
                {
                  label: "Age",
                  value: profile.age ? String(profile.age) : "—",
                },
                { label: "Bio", value: profile.bio || "—" },
              ].map((item) => (
                <Box key={item.label} className="about_row">
                  <Typography className="label">{item.label}</Typography>
                  <Typography className="value">{item.value}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box className="box constellations">
              <Typography className="about_title">
                CONSTELLATIONS EARNED
              </Typography>

              <Grid container spacing={2}>
                {constellations.map((c) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={c.title}>
                    <Box className="constellation_card">
                      <Box
                        className="constellation_icon"
                        sx={{ background: c.gradient }}
                      >
                        {c.icon}
                      </Box>
                      <Box>
                        <Typography className="constellation_title">
                          {c.title}
                        </Typography>
                        <Typography className="constellation_desc">
                          {c.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* ACTIVITY */}
        <Box className="box activity">
          <Typography className="activity_title">RECENT ACTIVITY</Typography>

          {[
            { text: "Posted in", tag: "#andromeda-ops", time: "2h" },
            { text: "Joined channel", tag: "#pulsar-design", time: "9h" },
            { text: "Reacted to", tag: "Aria Vex", time: "1d" },
            { text: "Started", tag: "#cosmic-jokes", time: "3d" },
          ].map((item) => (
            <Box key={item.tag} className="activity_row">
              <Box className="left">
                <span className="dot"></span>
                <Typography className="text">
                  {item.text} <span className="highlight">{item.tag}</span>
                </Typography>
              </Box>

              <Typography className="time">{item.time}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      {open && (
        <CustomModal
          open={open}
          onClose={() => setOpen(false)}
          title="Edit Profile"
          handleModalBody={() => handleEditProfileBody()}
          width={"800px"}
        ></CustomModal>
      )}
    </>
  );
};

export default Profile;
