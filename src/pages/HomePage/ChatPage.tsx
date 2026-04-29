import { Grid } from "@mui/material";
import React from "react";
import ChatList from "./ChatList";
import ChatArea from "./ChatArea";

const ChatPage = () => {
  return (
    <div>
      <Grid container spacing={0} sx={{ height: "100%" }}>
        <Grid size={3} sx={{ height: "100%" }}>
          <ChatList />
        </Grid>
        
        <Grid size={9} sx={{ height: "100%" }}>
          <ChatArea />
        </Grid>
      </Grid>
    </div>
  );
};

export default ChatPage;
