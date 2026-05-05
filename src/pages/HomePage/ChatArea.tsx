import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddIcon from "@mui/icons-material/Add";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import EmojiPicker from "emoji-picker-react";
const ChatArea = () => {
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [message, setMessage] = React.useState("");

  const handleEmojiClick = (emojiData: any) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

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
      {showEmoji && (
        <div className="emoji-picker">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme={"dark" as any} />
        </div>
      )}
      <div className="chat_area_footer">
        <AddIcon className="icon" />
        <div style={{ width: "100%" }}>
          <TextField
            fullWidth
            placeholder="Type a message..."
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="search-input"
          />
        </div>
        <SentimentSatisfiedOutlinedIcon
          className="icon"
          onClick={() => setShowEmoji((prev) => !prev)}
        />
        <div style={{ width: "100px" }}>
          <button className="primary-button" type="submit">
            Send
          </button>
        </div>
      </div>
    </Box>
  );
};

export default ChatArea;
