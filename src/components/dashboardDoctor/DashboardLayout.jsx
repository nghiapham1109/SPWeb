import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
//
import DashboardNavbar from "./DashboardNavbar.jsx";
import DashboardSidebar from "./DashboardSideBar.jsx";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import Scrollbar from "./Scrollbar.jsx";
import NavSection from "./NavSection.jsx";
import sidebarConfig from "./SidebarConfig.jsx";
import BackendAPI from "../../api/HttpClient";
import jwt_decode from "jwt-decode";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
const DRAWER_WIDTH = 280;

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));
// ----------------------------------------------------------------------
const renderContent = (
  <Scrollbar
    sx={{
      height: "100%",
      "& .simplebar-content": {
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
    }}
  >
    <Box sx={{ py: 3, textAlign: "left", ml: 3 }}>
      <Box to="/" sx={{ display: "inline-flex" }}>
        <Box
          component="img"
          src="/images/logo-icon.png"
          sx={{ width: 50, height: 50, zIndex: 99 }}
        />
        ;
      </Box>
    </Box>
    <Box sx={{ mb: 5, mx: 2.5 }}>
      <Link underline="none" to="#">
        <AccountStyle>
          <Avatar src="/images/avatar_default.jpg" alt="photoURL" />
          <Box sx={{ ml: 5 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.primary" }}
            ></Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", textAlign: "center" }}
            >
              DOCTOR
            </Typography>
          </Box>
        </AccountStyle>
      </Link>
    </Box>
    <NavSection navConfig={sidebarConfig} />

    <Box sx={{ flexGrow: 1 }} />
  </Scrollbar>
);
export default function DashboardLayout(props) {
  //
  const [open, setOpen] = useState(false);
  //
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <Box
        sx={{
          height: 755,
          position: "relative",
          zIndex: 1200,
          minWidth: DRAWER_WIDTH,
          backgroundColor: "rgb(208, 242, 255)",
        }}
      >
        {renderContent}
      </Box>

      <MainStyle>{props.children}</MainStyle>
    </RootStyle>
  );
}
