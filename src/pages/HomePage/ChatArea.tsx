import { Box, TextField } from "@mui/material";
import React from "react";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddIcon from "@mui/icons-material/Add";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";

const ChatArea = () => {
  return (
    <Box className="chat_area">
      <div className="chat_area_header">
        <div className="chat_area_header_avatar">
          <div className="dm__avatar">
            AV
            <span className="status-dot"></span>
          </div>

          <div className="dm__info">
            <p className="name">Aria Vex</p>
            <p className="message">Hello, how are you?</p>
          </div>
        </div>
        <div className="chat_area_header_actions">
          <LocalPhoneOutlinedIcon className="icon" />
          <VideocamOutlinedIcon className="icon" />
          <InfoOutlinedIcon className="icon" />
        </div>
      </div>
      <div className="chat_area_body"></div>
      <div className="chat_area_footer">
        {/* <div > */}
        <AddIcon className="icon" />
        <div style={{width: '100%'}}>
          <TextField
            fullWidth
            placeholder="Type a message..."
            variant="outlined"
            className="search-input"
          />
        </div>
        <SentimentSatisfiedOutlinedIcon className="icon" />
       <div style={{width: "100px"}}>
         <button className="primary-button" type="submit">
          Send
        </button>
       </div>
      </div>
    </Box>
  );
};

export default ChatArea;
