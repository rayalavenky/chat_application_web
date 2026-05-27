import { Tab, Tabs } from "@mui/material";
import React, {  useState } from "react";



interface UserTableProps {
  data?: any;
}

const UserTable: React.FC<UserTableProps> = ({ data }) => {
  const [tab, setTab] = useState<any>(0);


  return (
    <div className="user-table">
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
            {data?.map((user:any, index: number) => (
              <tr key={index}>
                <td>
                  <div className="user-info">
                    <div className="avatar">{user.firstName.charAt(0)}{user?.lastName?.charAt(0)}</div>
                    <div>
                      <p>{user.firstName} {user.lastName}</p>
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
