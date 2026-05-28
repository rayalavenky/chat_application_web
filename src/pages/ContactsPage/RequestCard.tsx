import { Button } from "@mui/material";

const RequestCard = ({ userData, tab, onAccept, isAccepting }: any) => {
  const user = tab === 2 ? userData?.toUser : userData?.fromUser;

  const handleDeclineRequest = (id: string) => {
    // Implement decline request logic here
    console.log("Declined request for user ID:", id);
  };
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
                    onClick={() => handleDeclineRequest(userData.requestId)}
                    disabled={isAccepting}
                  >
                    Decline
                  </Button>

                  <Button
                    className="accept-btn"
                    onClick={() => onAccept?.(userData.requestId)}
                    disabled={isAccepting}
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
