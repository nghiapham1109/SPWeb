import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import { Link as RouterLink } from "react-router-dom";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { EditDayBusyDialog } from "./dialog/editDialog";
import BackendAPI from "../../api/HttpClient";
import jwt_decode from "jwt-decode";

// ----------------------------------------------------------------------

export default function SymptomMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { IDDayBusy, onUpdateSuccess } = props;
  console.log("MoreMemuBusy", IDDayBusy);
  //
  const handleOpenEditDialog = () => {
    setOpenEdit(true);
  };
  //
  const handleCloseEdit = (isSuccessEdit) => {
    setOpenEdit(false);
    props.onClose(isSuccessEdit);
  };
  const deleteDayBusy = () => {
    const getToken = localStorage.getItem("storeToken");
    console.log("Token", getToken);
    BackendAPI.delete(`/api/daybusy/delete/${IDDayBusy}`, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((json) => {
        console.log(json);
        alert("Delete note success!");
        props.onDeleteSuccess();
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  };
  return (
    <>
      {
        <EditDayBusyDialog
          open={openEdit}
          onCloseEdit={handleCloseEdit}
          IDDayBusy={IDDayBusy}
          onUpdateSuccess={onUpdateSuccess}
        />
      }
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={() => props.onDelete()}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
            onClick={() => {
              deleteDayBusy();
            }}
          />
        </MenuItem>

        <MenuItem
          to="#"
          sx={{ color: "text.secondary" }}
          onClick={() => {
            handleOpenEditDialog();
          }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
