import React from "react";
import StatCard from './StatCard';
import UserTable from './UserTable';

const Users = () => {
  return (
    <div className="users">
      <div className="users__header">
        <div>
          <h1>Users</h1>
          <p>Everyone registered to the OrbiTalk network.</p>
        </div>

        <button className="export-btn">Export CSV</button>
      </div>

      {/* Stats */}
      <div className="users__stats">
        <StatCard title="Total Users" count="10" />
        <StatCard title="Active" count="6" type="active" />
        <StatCard title="Suspended" count="2" type="suspended" />
        <StatCard title="Pending" count="2" type="pending" />
      </div>

      {/* Table */}
      <UserTable />
    </div>
  );
};

export default Users;