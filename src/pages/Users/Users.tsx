import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import StatCard from "./StatCard";
import UserTable from "./UserTable";
import { useGetUsersQuery } from "../../services/userApi";
import Loader from "../../components/Loader";
import { useGetOnlineContactsQuery } from "../../services/userRequest";

const PAGE_SIZE = 7;

const Users = () => {
  const [tab, setTab] = useState(0);
  const [onlinePage, setOnlinePage] = useState(1);
  const [usersData, setUsersData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const { data: userProfileResponse, isLoading: isFetchingProfile } =
    useGetUsersQuery(
      { page, limit: PAGE_SIZE },
      { skip: tab !== 0, refetchOnMountOrArgChange: true },
    );

  const {
    data: onlineContactsResponseData,
    isFetching: isFetchingOnlineContacts,
  } = useGetOnlineContactsQuery(
    { userId: "", isAdmin: true, page: onlinePage, limit: 8 },
    { skip: tab !== 1, refetchOnMountOrArgChange: true },
  );

  const totalRecords =
    tab === 0
      ? (userProfileResponse?.totalRecords ?? 0)
      : (onlineContactsResponseData?.totalRecords ?? 0);
  const pageCount = Math.ceil(totalRecords / PAGE_SIZE);

  useEffect(() => {
    if (userProfileResponse && userProfileResponse.data && tab === 0) {
      setUsersData(userProfileResponse?.data);
    } else if (
      onlineContactsResponseData &&
      onlineContactsResponseData.data &&
      tab === 1
    ) {
      setUsersData(onlineContactsResponseData?.data);
    }
  }, [userProfileResponse, onlineContactsResponseData, tab]);
  return (
    <div className="users">
      {isFetchingProfile && <Loader />}
      <div className="users__header">
        <div>
          <h1>Users</h1>
          <p>Everyone registered to the OrbiTalk network.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="users__stats">
        <StatCard
          title="Total Users"
          count={String(totalRecords)}
          type="total"
        />
        <StatCard title="Online" count="6" type="online" />
        <StatCard title="Offline" count="2" type="offline" />
      </div>

      {/* Table */}
      <UserTable data={usersData} onTabChange={setTab} />

      {pageCount > 1 && (
        <div className="users__pagination">
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </div>
      )}
    </div>
  );
};

export default Users;
