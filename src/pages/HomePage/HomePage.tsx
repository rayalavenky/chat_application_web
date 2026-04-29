import Grid from "@mui/material/Grid";
import React from "react";
import SideBar from "./SideBar";
import ChatList from "./ChatList";
import ChatArea from "./ChatArea";

const HomePage = () => {
  return (
    <div className="home">
      <Grid container spacing={0} sx={{ height: "100%" }}>
        <Grid size={2} sx={{ height: "100%" }}>
          <SideBar />
        </Grid>

        <Grid size={2} sx={{ height: "100%" }}>
          <ChatList />
        </Grid>

        <Grid size={8} sx={{ height: "100%" }}>
          <ChatArea />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
