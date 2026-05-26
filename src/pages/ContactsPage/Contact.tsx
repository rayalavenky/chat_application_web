import {
  Box,
  Button,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Orbitcard from "./Orbitcard";
import RequestCard from "./RequestCard";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CustomModal from "../../components/commons/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import SearchIcon from "@mui/icons-material/Search";
import { useLazyGetUsersQuery } from "../../services/userApi";
import {
  useGetReceivedRequestsQuery,
  useGetSendRequestsQuery,
  useSendConnectionRequestMutation,
} from "../../services/userRequest";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Contact = () => {
  const currentUser = useSelector((state: any) => state.user.userData);
  console.log(currentUser, "currentUser");

  const [tab, setTab] = useState<any>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [getUser, { data: userProfileResponse, isLoading: isFetchingProfile }] =
    useLazyGetUsersQuery({});
  const [sendConnectionRequest] = useSendConnectionRequestMutation();
  const {
    data: requestResponseData,
    isFetching: isFetchingReceived,
  } = useGetReceivedRequestsQuery(
    { userId: currentUser.id },
    { skip: !currentUser.id || tab !== 3, refetchOnMountOrArgChange: true },
  );
  const {
    data: sendRequestsResponseData,
    isFetching: isFetchingSent,
  } = useGetSendRequestsQuery(
    { userId: currentUser.id },
    { skip: !currentUser.id || tab !== 2, refetchOnMountOrArgChange: true },
  );

  console.log(requestResponseData, "requestResponseData");

  const users = [
    {
      initials: "AV",
      name: "Aria Vex",
      handle: "@aria.vex",
      mutual: 12,
      online: true,
    },
    {
      initials: "KS",
      name: "Kai Stratos",
      handle: "@kai.stratos",
      mutual: 8,
      online: true,
    },
    {
      initials: "NL",
      name: "Nova Lin",
      handle: "@nova.lin",
      mutual: 24,
      online: false,
    },
    {
      initials: "OM",
      name: "Orin Mist",
      handle: "@orin.mist",
      mutual: 3,
      online: false,
    },
    {
      initials: "LS",
      name: "Lyra Solace",
      handle: "@lyra.solace",
      mutual: 17,
      online: true,
    },
    {
      initials: "ZH",
      name: "Zephyr Halo",
      handle: "@zephyr.halo",
      mutual: 5,
      online: false,
    },
    {
      initials: "MV",
      name: "Mira Vale",
      handle: "@mira.vale",
      mutual: 9,
      online: true,
    },
    {
      initials: "TQ",
      name: "Theo Quark",
      handle: "@theo.quark",
      mutual: 14,
      online: false,
    },
  ];

  const requests = [
    {
      initials: "SA",
      name: "Solene Ash",
      handle: "@solene.ash",
      mutual: 4,
    },
    {
      initials: "RC",
      name: "Ren Comet",
      handle: "@ren.comet",
      mutual: 1,
    },
    {
      initials: "NV",
      name: "Nova Vale",
      handle: "@nova.vale",
      mutual: 7,
    },
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string().matches(
        /^[0-9]{1,10}$/,
        "Invalid phone number",
      ),
    }),

    onSubmit: async (values) => {
      const search = {
        phoneNumber: values.phoneNumber,
      };
      const searchParam = JSON.stringify(search);
      await getUser({
        search: searchParam,
      });
    },
  });

  const handleSendRequest = async (toUserId: string) => {
    // Implement the logic to send a connection request to the user
    console.log("Send request clicked");
    try {
      const response = await sendConnectionRequest({
        fromUserId: currentUser.id,
        toUserId: toUserId,
      }).unwrap();
      toast.success(response?.message || "Request sent successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send connection request");
    }
  };

  const handleSendRequestBody = () => {
    return (
      <Box className="send-request-body">
        <p className="request-text">
          Enter a phone number to discover orbiters you can connect with.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 8 }}>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    formik.setFieldValue("phoneNumber", value);
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
                  slotProps={{
                    htmlInput: {
                      minLength: 1,
                      maxLength: 10,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }} className="search-btn-grid">
                <Button
                  type="submit"
                  startIcon={<SearchIcon />}
                  className="submit-btn"
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
        <div className="search-users-list">
          {userProfileResponse?.data?.map((user) => {
            const initials =
              user.firstName.charAt(0).toUpperCase() +
              user.lastName.charAt(0).toUpperCase();

            return (
              <div className="search-user-card" key={user.id}>
                <div className="search-user-left">
                  <div className="search-user-avatar">{initials}</div>

                  <div className="search-user-info">
                    <h3>
                      {user.firstName} {user.lastName}
                    </h3>

                    <span>
                      @{user.firstName.toLowerCase()}
                      {user.lastName.toLowerCase()}
                    </span>
                  </div>
                </div>

                <Button
                  className="send-request-btn"
                  onClick={() => handleSendRequest(user.id)}
                >
                  <SendOutlinedIcon />
                  Send Request
                </Button>
              </div>
            );
          })}
        </div>
      </Box>
    );
  };

  return (
    <>
      <Box className="contact">
        <div className="contact__header">
          <div>
            <h1>Contacts</h1>
            <p>People you orbit with — 8 connections.</p>
          </div>
          <Button
            className="add-btn"
            onClick={() => {
              setOpen(true);
            }}
          >
            {" "}
            <IconButton className="send-btn">
              <SendOutlinedIcon />
            </IconButton>{" "}
            Send Request
          </Button>
        </div>
        <div className="contact__controls">
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            className="custom-tabs"
          >
            <Tab label="All" />
            <Tab label="Online" />
            <Tab label="Requests Send" />
            <Tab label="Requests Received" />
            <Tab label="Blocked" />
          </Tabs>

          <div>
            <TextField
              placeholder="Search by name or callsign..."
              size="small"
              variant="outlined"
              className="search-input"
            />
          </div>
        </div>
        {/* NORMAL CONTACTS */}
        {tab !== 2 && tab !== 3 && (
          <div className="contact__grid">
            {users.map((user, i) => (
              <Orbitcard key={i} user={user} />
            ))}
          </div>
        )}

        {/* REQUEST SCREEN */}
        {(tab === 2 || tab === 3) && (
          <div className="contact__requests">
            {tab === 2 && (
              <>
                {isFetchingSent ? (
                  <Loader />
                ) : (sendRequestsResponseData?.data?.length ?? 0) > 0 ? (
                  sendRequestsResponseData?.data?.map((user, i) => (
                    <RequestCard key={i} userData={user} tab={tab} />
                  ))
                ) : (
                  <div className="empty-request-state">
                    No sent requests found
                  </div>
                )}
              </>
            )}

            {tab === 3 && (
              <>
                {isFetchingReceived ? (
                  <Loader />
                ) : (requestResponseData?.data?.length ?? 0) > 0 ? (
                  requestResponseData?.data?.map((user, i) => (
                    <RequestCard key={i} userData={user} tab={tab} />
                  ))
                ) : (
                  <div className="empty-request-state">
                    No received requests found
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </Box>
      {open && (
        <CustomModal
          open={open}
          onClose={() => setOpen(false)}
          title="Send a Request"
          handleModalBody={() => handleSendRequestBody()}
          width={"500px"}
        ></CustomModal>
      )}
    </>
  );
};

export default Contact;
