import React, { useEffect, useState } from "react";
import StatCard from './StatCard';
import UserTable from './UserTable';
import { useGetUsersQuery } from "../../services/userApi";
import Loader from "../../components/Loader";


const Users = () => {
    const [usersData, setUsersData] = useState<any>([]);
  const { data: userProfileResponse , isLoading: isFetchingProfile} = useGetUsersQuery({});    
  
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
        <StatCard title="Total Users" count="10" type="total" />
        <StatCard title="Active" count="6" type="active" />
        <StatCard title="Suspended" count="2" type="suspended" />
        <StatCard title="Pending" count="2" type="pending" />
      </div>

      {/* Table */}
      <UserTable data={usersData}/>
    </div>
  );
};

export default Users;