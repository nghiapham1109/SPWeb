import * as React from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
//
const options = [
  "Show some love to MUI",
  "Show all notification content",
  "Hide sensitive notification content",
  "Hide all notification content",
];
//
export default function BadgeDoctor() {
  //
  const [anchorEl, setAnchorEl] = React.useState(null);
  //
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //
  const handleClose = () => {
    setAnchorEl(null);
  };
  //
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //

  //
  return (
    <>
      <Button aria-describedby={id} onClick={handleClick} sx={{ margin: 5 }}>
        <Box sx={{ color: "action.active" }}>
          <Badge color="secondary" variant="dot">
            <MailIcon />
          </Badge>
        </Box>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          sx={{ p: 1, width: 350, height: 200, textAlign: "justify" }}
        >
          The content of the Popover.
        </Typography>
      </Popover>
    </>
  );
}
