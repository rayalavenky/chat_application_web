import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Orbitalk from "../../assets/images/Icon.png";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  currentUser: any;
}
const SideBar: React.FC<SideBarProps> = ({
  activeMenu,
  setActiveMenu,
  currentUser,
}) => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const role = currentUser?.role || "";
  const allMenus = [
    {
      name: "dashboard",
      icon: <SettingsOutlinedIcon className="icon" />,
      roles: ["ADMIN"],
    },
    {
      name: "users",
      icon: <PeopleAltOutlinedIcon className="icon" />,
      roles: ["ADMIN"],
    },
    {
      name: "chat",
      icon: <ChatBubbleOutlineOutlinedIcon className="icon" />,
      roles: ["ADMIN","USER"],
    },
    {
      name: "contacts",
      icon: <PeopleAltOutlinedIcon className="icon" />,
      roles: ["ADMIN","USER"],
    },
    {
      name: "profile",
      icon: <PersonOutlinedIcon className="icon" />,
      roles: ["ADMIN","USER"],
    },
    {
      name: "settings",
      icon: <SettingsOutlinedIcon className="icon" />,
      roles: ["ADMIN","USER"],
    },
  ];

  const handleSelectMenu = (menu: string) => {
    setActiveMenu(menu);
    navigate(`/user/${menu}`);
  };

  useEffect(() => {
    const menuItems = allMenus.filter((menu) => menu.roles.includes(role));
    setMenuItems(menuItems);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

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
            onClick={() => handleSelectMenu(item.name)}
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
