import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = React.useState<string>("");
  const currentUser = useSelector((state: any) => state.user.userData);

  useEffect(() => {
    const path = location.pathname.split("/");
    setActiveMenu(path[path.length - 1]);
  }, [location]);

  return (
    <div className="home">
      <Grid container spacing={0} sx={{ height: "100%" }} >
        <Grid size={2} sx={{ height: "100%" }}>
          <SideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} currentUser={currentUser} />
        </Grid>

        <Grid size={10} sx={{ height: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
