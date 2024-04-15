"use client";
import { styled, useTheme } from "@mui/material/styles";
import { toast } from "react-hot-toast";

import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "@/common";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter, usePathname } from "next/navigation";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CategoryIcon from "@mui/icons-material/Category";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";

const buyerMenu = [
  {
    name: "Users",
    icon: <PeopleIcon />,
    link: "/dashboard/users",
  },
  {
    name: "Products",
    icon: <ListAltIcon />,
    link: "/dashboard/products",
  },
];

const generalMenu = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  // {
  //   name: "My Profile",
  //   icon: <AccountCircleIcon />,
  //   link: "/dashboard/profile",
  // },
];

const settingsMenu = [
  {
    name: "Slider",
    icon: <LinearScaleIcon />,
    link: "/dashboard/slider",
  },
  {
    name: "Website Ads",
    icon: <AdsClickIcon />,
    link: "/dashboard/ads",
  },
  {
    name: "Services",
    icon: <ElectricalServicesIcon />,
    link: "/dashboard/services",
  },
  {
    name: "Categories",
    icon: <CategoryIcon />,
    link: "/dashboard/categories",
  },
];

const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const DashboardDrawer = ({ open, handleDrawerClose, lang }) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    router.push(`/login`);
    localStorage.removeItem("token");
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {generalMenu.map((item, index) => {
          return (
            <ListItem
              key={index}
              disablePadding
              style={{
                backgroundColor:
                  pathname === item.link
                    ? "rgba(0, 0, 0, 0.09)"
                    : "transparent",
              }}
            >
              <Link href={item.link} style={{ width: "100%" }}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>

      <Divider />
      <List>
        {buyerMenu.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            style={{
              backgroundColor:
                pathname === item.link ? "rgba(0, 0, 0, 0.09)" : "transparent",
            }}
          >
            <Link href={`${item.link}`} style={{ width: "100%" }}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {settingsMenu.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            style={{
              backgroundColor:
                pathname === item.link ? "rgba(0, 0, 0, 0.09)" : "transparent",
            }}
          >
            <Link href={`${item.link}`} style={{ width: "100%" }}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DashboardDrawer;
