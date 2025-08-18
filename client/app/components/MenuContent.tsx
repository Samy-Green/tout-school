import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupIcon from "@mui/icons-material/Group";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import StarIcon from "@mui/icons-material/Star";
import TaskIcon from "@mui/icons-material/Task";
import Badge from "@mui/material/Badge";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState } from "react";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon /> },
  {
    text: "Analytics",
    icon: <AnalyticsRoundedIcon />,
    badge: 5,
    submenu: [
      { text: "Rapports", icon: <AssessmentIcon /> },
      { text: "Statistiques", icon: <BarChartIcon /> },
      { text: "Tableaux de bord", icon: <DashboardIcon /> },
    ],
  },
  {
    text: "Clients",
    icon: <PeopleRoundedIcon />,
    submenu: [
      { text: "Liste des clients", icon: <GroupIcon /> },
      { text: "Nouveaux clients", icon: <PersonAddIcon /> },
      { text: "Clients VIP", icon: <StarIcon /> },
    ],
  },
  {
    text: "Tasks",
    icon: <AssignmentRoundedIcon />,
    submenu: [
      { text: "Mes tâches", icon: <TaskIcon /> },
      { text: "Calendrier", icon: <CalendarTodayIcon /> },
      { text: "Notifications", icon: <NotificationsIcon /> },
    ],
  },
];

const secondaryListItems = [
  { text: "Settings", icon: <SettingsRoundedIcon /> },
  { text: "About", icon: <InfoRoundedIcon /> },
  { text: "Feedback", icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const [openMenus, setOpenMenus] = useState({});

  const handleClick = (index: number) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={index === 2}
                onClick={() => item.submenu && handleClick(index)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                <Badge
                  badgeContent={item.badge ?? 0}
                  max={9}
                  color="error"
                ></Badge>
                {item.submenu &&
                  (openMenus[index] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.submenu && (
              <Collapse in={openMenus[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense>
                  {item.submenu.map((subItem, subIndex) => (
                    <ListItem
                      key={subIndex}
                      disablePadding
                      sx={{ display: "block" }}
                    >
                      <ListItemButton
                        sx={{ pl: 4 }}
                        selected={subIndex === 1 && index === 2}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
