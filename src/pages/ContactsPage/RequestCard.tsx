import React from "react";
import { Button } from "@mui/material";

const RequestCard = ({ user }: any) => {
  return (
    <div className="request-card">
      <div className="request-card__left">
        <div className="request-card__avatar">
          {user.initials}
        </div>

        <div className="request-card__info">
          <h3>{user.name}</h3>
          <span>{user.handle}</span>
          <p>{user.mutual} mutual orbiters</p>
        </div>
      </div>

      <div className="request-card__actions">
        <Button className="decline-btn">
          Decline
        </Button>

        <Button className="accept-btn">
          Accept
        </Button>
      </div>
    </div>
  );
};

export default RequestCard;