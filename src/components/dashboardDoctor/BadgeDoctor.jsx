import { useEffect, useState, Fragment, useMemo } from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BackendAPI from "../../api/HttpClient";
import jwt_decode from "jwt-decode";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
//
import { io } from "socket.io-client";
//
//
export default function BadgeDoctor(props) {
  //
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [reRender, setRerender] = useState(false);
  const socket = useMemo(() => {
    return io("http://localhost:8080", { transports: ["websocket"] });
  }, []);
  //
  const getToken = localStorage.getItem("storeToken");
  const decode = jwt_decode(getToken);
  const IDDoctor = decode.result.IDDoctor;
  //
  useEffect(() => {
    socket?.on(`new-notification-${IDDoctor}`, () => {
      setRerender((prev) => !prev);
    });
    return () => {
      socket?.off(`new-notification-${IDDoctor}`);
    };
  }, [IDDoctor, socket]);

  useEffect(() => {
    getBooking();
  }, [reRender]);
  //
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //
  const handleClose = () => {
    setAnchorEl(null);
  };
  //
  const updateStatus = (IDNotification) => {
    BackendAPI.put(`/api/notification/updateNotification/${IDNotification}`)
      .then((json) => {
        setRerender((prev) => !prev);
      })
      .catch((error) => {});
  };
  //
  const getBooking = () => {
    BackendAPI.get(`/api/doctor/notification/${IDDoctor}`, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((json) => {
        setData(json.data.data);
        console.log("badgeDOctor", json.data.data);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  };
  //
  const checkNotification = data.filter(
    ({ CheckNotification }) => CheckNotification == false
  );
  //
  return (
    <>
      <Button onClick={handleClick}>
        <Box sx={{ color: "action.active" }}>
          <Badge badgeContent={checkNotification.length} color="success">
            <MailIcon color="action" />
          </Badge>
        </Box>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {data.map((item, idx) => {
          const isSeen = item.CheckNotification == 1;
          const bgColor = isSeen ? "#80d6ff" : "#aeaeae";

          return (
            <MenuItem
              key={idx}
              style={{
                backgroundColor: bgColor,
                borderRadius: 10,
                padding: 5,
                margin: 10,
                color: "white",
              }}
              onClick={() => {
                if (!isSeen) {
                  updateStatus(item.IDNotification);
                }
              }}
            >
              You have an appointment on{" "}
              {item.DayBooking.split("-").reverse().join("-")} with{" "}
              {item.NamePatient} at {item.TimeBooking}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
