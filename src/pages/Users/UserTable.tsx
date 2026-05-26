import { Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetUsersQuery } from "../../services/userApi";
import Loader from "../../components/Loader";


const UserTable = () => {
  const [tab, setTab] = useState<any>(0);
  const [usersData, setUsersData] = useState<any>([]);
  const { data: userProfileResponse , isLoading: isFetchingProfile} = useGetUsersQuery({});    
  console.log(userProfileResponse,'------------------userProfileResponse');
  
  useEffect(() => {
    if (userProfileResponse) {
      setUsersData(tab === 1 ? userProfileResponse?.data?.filter((user:any)=> user?.isOnline) : userProfileResponse?.data);
    }
  }, [userProfileResponse, tab]);
  


  return (
    <div className="user-table">
      {isFetchingProfile && (
        <Loader/>
      )}
      <div className="table-header">
        <div className="tabs">
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            className="custom-tabs"
          >
            <Tab label="All" />
            <Tab label="Online" />
            <Tab label="Requests" />
            <Tab label="Blocked" />
          </Tabs>
        </div>
      </div>

      <table className="user-table__head-table">
        <colgroup>
          <col style={{ width: "26%" }} />
          <col style={{ width: "26%" }} />
          <col style={{ width: "16%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "14%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Bio</th>
            <th>Status</th>
          </tr>
        </thead>
      </table>

      <div className="table-scroll">
        <table className="user-table__body-table">
          <colgroup>
            <col style={{ width: "26%" }} />
            <col style={{ width: "26%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "14%" }} />
          </colgroup>
          <tbody>
            {usersData?.map((user:any, index: number) => (
              <tr key={index}>
                <td>
                  <div className="user-info">
                    <div className="avatar">{user.firstName.charAt(0)}</div>
                    <div>
                      <p>{user.firstName} {user.lastName}</p>
                      <span>{user.email}</span>
                    </div>
                  </div>
                </td>

                <td>{user.email ? user.email : "-"}</td>
                <td>{user.phoneNumber ? user.phoneNumber : "-"}</td>
                <td>{user.bio ? user.bio : "-"}</td>

                <td>
                  <span className={`status ${user.isOnline ? "active" : "pending"}`}>{user.isOnline ? "Online" : "Offline"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
