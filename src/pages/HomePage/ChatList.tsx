import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const ChatList = () => {
  const [activeChatID, setActiveChatID] = useState<string>("");
  const users = [
    {
      userID: "1",
      name: "Aria Vex",
      message: "see you in orbit ✦",
      initials: "AV",
    },
    {
      userID: "2",
      name: "Kai Stratos",
      message: "pushed the patch",
      initials: "KS",
    },
    {
      userID: "3",
      name: "Nova Lin",
      message: "thanks for the assist",
      initials: "NL",
    },
    {
      userID: "4",
      name: "Orin Mist",
      message: "tomorrow at 0900?",
      initials: "OM",
    },
  ];

  const handleClickOnChat = (userID: any) => {
    setActiveChatID(userID);
  };

  return (
    <Box className="sidebar">
      <div className="chat_list">
        <h4>Signals</h4>
        <AddIcon className="icon" />
      </div>
      <div>
         <TextField
      fullWidth
      placeholder="Search chat..."
      variant="outlined"
      className="search-input"
      slotProps={{
       input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="search-icon" />
            </InputAdornment>
          ),
        },
      }}
    />
      </div>
      <div className="dm">
        <p className="dm__title">DIRECT MESSAGES</p>

        {users.map((user, index) => (
          <div
            key={index}
            className={`dm__item ${activeChatID === user.userID ? "active" : ""}`}
            onClick={() => handleClickOnChat(user.userID)}
          >
            <div className="dm__avatar">
              {user.initials}
              <span className="status-dot"></span>
            </div>

            <div className="dm__info">
              <p className="name">{user.name}</p>
              <p className="message">{user.message}</p>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ChatList;
