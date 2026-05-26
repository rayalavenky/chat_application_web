import React from "react";
import { Button } from "@mui/material";

const RequestCard = ({ userData, tab }: any) => {

  const user = userData?.toUser ; // Adjust based on the actual data structure
  console.log(userData ,user,'------------------user in request card');
  return (
    <div className="request-card">
      <div className="request-card__left">
        <div className="request-card__avatar">
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </div>

        <div className="request-card__info">
          <h3>
            {user?.firstName} {user?.lastName}
          </h3>
          <span>{user?.email}</span>
          <p>{user?.mutual} mutual orbiters</p>
        </div>
      </div>

      <div className="request-card__actions">
        {tab === 2 ? (
          <div className={`request-status ${userData?.status?.toLowerCase()}`}>
            {userData?.status}
          </div>
        ) : (
          <>
            {" "}
            <Button className="decline-btn">Decline</Button>
            <Button className="accept-btn">Accept</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
