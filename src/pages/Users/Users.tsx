import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import StatCard from './StatCard';
import UserTable from './UserTable';
import { useGetUsersQuery } from "../../services/userApi";
import Loader from "../../components/Loader";

const PAGE_SIZE = 10;

const Users = () => {
    const [usersData, setUsersData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const { data: userProfileResponse , isLoading: isFetchingProfile} = useGetUsersQuery({ page, limit: PAGE_SIZE });

  const totalRecords = userProfileResponse?.totalRecords ?? 0;
  const pageCount = Math.ceil(totalRecords / PAGE_SIZE);

  useEffect(() => {
    if (userProfileResponse) {
      setUsersData(userProfileResponse?.data);
    }
  }, [userProfileResponse]);
  return (
    <div className="users">
       {isFetchingProfile && (
        <Loader/>
      )}
      <div className="users__header">
        <div>
          <h1>Users</h1>
          <p>Everyone registered to the OrbiTalk network.</p>
        </div>

      </div>

      {/* Stats */}
      <div className="users__stats">
        <StatCard title="Total Users" count={String(totalRecords)} type="total" />
        <StatCard title="Active" count="6" type="active" />
        <StatCard title="Suspended" count="2" type="suspended" />
        <StatCard title="Pending" count="2" type="pending" />
      </div>

      {/* Table */}
      <UserTable data={usersData}/>

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