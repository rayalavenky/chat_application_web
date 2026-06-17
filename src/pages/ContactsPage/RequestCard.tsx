import { Button } from "@mui/material";

const RequestCard = ({
  userData,
  tab,
  onAccept,
  onReject,
  isAccepting,
  isRejecting,
}: any) => {
  const user = tab === 2 ? userData?.toUser : userData?.fromUser;

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
        </div>
      </div>

      <div className="request-card__actions">
        {tab === 2 ? (
          <div className={`request-status ${userData?.status?.toLowerCase()}`}>
            {userData?.status}
          </div>
        ) : (
          <>
            {tab === 3 &&
              (userData?.status.toLowerCase() === "pending" ? (
                <>
                  <Button
                    className="decline-btn"
                    onClick={() => onReject?.(userData.requestId)}
                    disabled={isAccepting || isRejecting}
                  >
                    {isRejecting ? "Declining..." : "Decline"}
                  </Button>

                  <Button
                    className="accept-btn"
                    onClick={() => onAccept?.(userData.requestId)}
                    disabled={isAccepting || isRejecting}
                  >
                    {isAccepting ? "Accepting..." : "Accept"}
                  </Button>
                </>
              ) : (
                <div
                  className={`request-status ${userData?.status?.toLowerCase()}`}
                >
                  {userData?.status}
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
