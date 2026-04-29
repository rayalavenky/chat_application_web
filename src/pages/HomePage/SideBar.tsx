import { Box } from "@mui/material";
import React, { useState } from "react";
import Orbitalk from "../../assets/images/Icon.png";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState<string>("chat");
  const menuItems = [
    {
      name: "chat",
      icon: <ChatBubbleOutlineOutlinedIcon className="icon" />,
    },
    {
      name: "contacts",
      icon: <PeopleAltOutlinedIcon className="icon" />,
    },
    {
      name: "profile",
      icon: <PersonOutlinedIcon className="icon" />,
    },
    {
      name: "settings",
      icon: <SettingsOutlinedIcon className="icon" />,
    },
  ];
  return (
    <Box className="sidebar">
      <div className="sidebar_header">
        <img src={Orbitalk} alt="Orbitalk" className="topbar_icon" />
        ORBITALK
      </div>
      <div className="sidebar_menu">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`sidebar_menu_list ${activeMenu === item.name ? "active" : ""}`}
            onClick={() => setActiveMenu(item.name)}
          >
            <div className="sidebar_menu_icon">{item.icon}</div>
            <div className="sidebar_menu_item">
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default SideBar;
