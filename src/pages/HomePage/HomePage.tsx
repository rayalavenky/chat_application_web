import Grid from "@mui/material/Grid";
import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const [activeMenu, setActiveMenu] = React.useState<string>("chat");
  return (
    <div className="home">
      <Grid container spacing={0} sx={{ height: "100%" }}>
        <Grid size={2} sx={{ height: "100%" }}>
          <SideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </Grid>

        <Grid size={10} sx={{ height: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
