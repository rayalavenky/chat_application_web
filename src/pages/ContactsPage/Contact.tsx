import {
  Box,
  Button,
  Grid,
  IconButton,
  Pagination,
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
  useAcceptConnectionRequestMutation,
  useGetReceivedRequestsQuery,
  useGetSendRequestsQuery,
  useGetUserContactsQuery,
  useRejectConnectionRequestMutation,
  useSendConnectionRequestMutation,
  useGetOnlineContactsQuery,
} from "../../services/userRequest";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const CONTACTS_PAGE_SIZE = 10;

const Contact = () => {
  const currentUser = useSelector((state: any) => state.user.userData);
  const [tab, setTab] = useState<any>(0);
  const [contactsPage, setContactsPage] = useState(1);
  const [requestsPage, setRequestsPage] = useState(1);
  const [open, setOpen] = useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = useState<any[]>([]);
  const [getUser, { data: userProfileResponse, isLoading: isFetchingProfile }] =
    useLazyGetUsersQuery({});
  const [sendConnectionRequest] = useSendConnectionRequestMutation();
  const [acceptConnectionRequest, { isLoading: isAccepting }] =
    useAcceptConnectionRequestMutation();
  const [rejectConnectionRequest, { isLoading: isRejecting }] =
    useRejectConnectionRequestMutation();
  const { data: contactsResponseData, isFetching: isFetchingContacts } =
    useGetUserContactsQuery(
      { userId: currentUser.id, page: contactsPage, limit: CONTACTS_PAGE_SIZE },
      {
        skip: !currentUser.id || tab !== 0,
        refetchOnMountOrArgChange: true,
      },
    );
  const {
    data: onlineContactsResponseData,
    isFetching: isFetchingOnlineContacts,
  } = useGetOnlineContactsQuery(
    { userId: currentUser.id, page: contactsPage, limit: CONTACTS_PAGE_SIZE },
    { skip: !currentUser.id || tab !== 1, refetchOnMountOrArgChange: true },
  );
  const { data: requestResponseData, isFetching: isFetchingReceived } =
    useGetReceivedRequestsQuery(
      { userId: currentUser.id, page: requestsPage, limit: CONTACTS_PAGE_SIZE },
      { skip: !currentUser.id || tab !== 3, refetchOnMountOrArgChange: true },
    );
  const { data: sendRequestsResponseData, isFetching: isFetchingSent } =
    useGetSendRequestsQuery(
      { userId: currentUser.id, page: requestsPage, limit: CONTACTS_PAGE_SIZE },
      { skip: !currentUser.id || tab !== 2, refetchOnMountOrArgChange: true },
    );

  const allContacts = contactsResponseData?.data ?? [];
  const onlineContacts = onlineContactsResponseData?.data ?? [];
  const contacts = tab === 1 ? onlineContacts : allContacts;

  const totalContacts =
    (tab === 1
      ? onlineContactsResponseData?.totalRecords
      : contactsResponseData?.totalRecords) ?? 0;
  const contactsPageCount = Math.ceil(totalContacts / CONTACTS_PAGE_SIZE);

  const sentRequestsPageCount = Math.ceil(
    (sendRequestsResponseData?.totalRecords ?? 0) / CONTACTS_PAGE_SIZE,
  );
  const receivedRequestsPageCount = Math.ceil(
    (requestResponseData?.totalRecords ?? 0) / CONTACTS_PAGE_SIZE,
  );

  const handleTabChange = (value: number) => {
    setTab(value);
    setContactsPage(1);
    setRequestsPage(1);
  };

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
      const response = await getUser({
        search: searchParam,
      }).unwrap();

      setSearchedUsers(response?.data || []);
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
      setSearchedUsers((prev) =>
        prev.map((user) =>
          user.id === toUserId ? { ...user, isRequestSent: true } : user,
        ),
      );
      toast.success(response?.message || "Request sent successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send connection request");
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const response = await acceptConnectionRequest({ requestId }).unwrap();
      toast.success(response?.message || "Request accepted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to accept request");
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      const response = await rejectConnectionRequest({ requestId }).unwrap();
      toast.success(response?.message || "Request rejected successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reject request");
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
          {searchedUsers.map((user) => {
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
                  disabled={user.isRequestSent || isAccepting}
                  className="send-request-btn"
                  onClick={() => {
                    if (user.isRequestReceived && user.incomingRequestId) {
                      handleAcceptRequest(user.incomingRequestId);
                    } else {
                      handleSendRequest(user.id);
                    }
                  }}
                >
                  <SendOutlinedIcon />
                  {user.isRequestSent
                    ? "Request Sent"
                    : user.isRequestReceived
                      ? "Accept Request"
                      : "Send Request"}
                </Button>
              </div>
            );
          })}
        </div>
      </Box>
    );
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setSearchedUsers([]);
  };

  return (
    <>
      {(isAccepting || isRejecting) && <Loader />}
      <Box className="contact">
        <div className="contact__header">
          <div>
            <h1>Contacts</h1>
            <p>
              People you orbit with —{" "}
              {contactsResponseData?.totalRecords ?? allContacts.length}{" "}
              connections.
            </p>
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
            onChange={(_, v) => handleTabChange(v)}
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
          <>
            {isFetchingContacts || isFetchingOnlineContacts ? (
              <Loader />
            ) : contacts.length > 0 ? (
              <>
                <div className="contact__grid">
                  {contacts.map((contact) => (
                    <Orbitcard key={contact.id} user={contact} />
                  ))}
                </div>
                {contactsPageCount > 1 && (
                  <div className="contact__pagination">
                    <Pagination
                      count={contactsPageCount}
                      page={contactsPage}
                      onChange={(_, value) => setContactsPage(value)}
                      color="primary"
                      shape="rounded"
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="empty-request-state mt-4">No contacts found</div>
            )}
          </>
        )}

        {/* REQUEST SCREEN */}
        {(tab === 2 || tab === 3) && (
          <div className="contact__requests">
            {tab === 2 && (
              <>
                {isFetchingSent ? (
                  <Loader />
                ) : (sendRequestsResponseData?.data?.length ?? 0) > 0 ? (
                  <>
                    {sendRequestsResponseData?.data?.map((user, i) => (
                      <RequestCard key={i} userData={user} tab={tab} />
                    ))}
                    {sentRequestsPageCount > 1 && (
                      <div className="contact__pagination">
                        <Pagination
                          count={sentRequestsPageCount}
                          page={requestsPage}
                          onChange={(_, value) => setRequestsPage(value)}
                          color="primary"
                          shape="rounded"
                        />
                      </div>
                    )}
                  </>
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
                  <>
                    {requestResponseData?.data?.map((user, i) => (
                      <RequestCard
                        key={i}
                        userData={user}
                        tab={tab}
                        onAccept={handleAcceptRequest}
                        onReject={handleRejectRequest}
                        isAccepting={isAccepting}
                        isRejecting={isRejecting}
                      />
                    ))}
                    {receivedRequestsPageCount > 1 && (
                      <div className="contact__pagination">
                        <Pagination
                          count={receivedRequestsPageCount}
                          page={requestsPage}
                          onChange={(_, value) => setRequestsPage(value)}
                          color="primary"
                          shape="rounded"
                        />
                      </div>
                    )}
                  </>
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
          onClose={() => handleClose()}
          title="Send a Request"
          handleModalBody={() => handleSendRequestBody()}
          width={"500px"}
        ></CustomModal>
      )}
    </>
  );
};

export default Contact;
