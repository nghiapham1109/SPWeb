import { Icon } from "@iconify/react";
import { useRef, useState, useEffect } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink } from "react-router-dom";
import BackendAPI from "../../api/HttpClient";
import jwt_decode from "jwt-decode";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "./MenuPopover.jsx";
//

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: "/",
  },
  {
    label: "Profile",
    icon: personFill,
    linkTo: "#",
  },
  {
    label: "Settings",
    icon: settings2Fill,
    linkTo: "#",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  //
  const getDoctorByID = () => {
    const getToken = localStorage.getItem("storeToken");
    const decode = jwt_decode(getToken);
    const IDDoctor = decode.result.IDDoctor;
    BackendAPI.get(`/api/doctor/${IDDoctor}`)
      .then((json) => {
        setData(json.data.data);
        console.log("InfoDoctor", json.data.data);
        // console.log(json.data.data);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  };
  useEffect(() => {
    getDoctorByID();
  }, []);
  //
  const onLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };
  //
  const handleOpen = () => {
    setOpen(true);
  };
  //
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src="/images/avatar_default.jpg" alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        {data.map((item, idx) => {
          return (
            <Box sx={{ my: 1.5, px: 2.5 }} key={idx}>
              <Typography variant="subtitle1" noWrap>
                {item.NameDoctor}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
                {item.Email}
              </Typography>
            </Box>
          );
        })}
        <Divider sx={{ my: 1 }} />
        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}
        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={(event) => onLogout(event)}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
