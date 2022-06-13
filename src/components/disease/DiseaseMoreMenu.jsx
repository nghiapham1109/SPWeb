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
  Dialog,
} from "@mui/material";
import { deleteDisease } from "../../actions/diseaseAction";
import { EditDiseaseDialog } from "./dialog/editDialog";
import BackendAPI from "../../api/HttpClient";
import jwt_decode from "jwt-decode";

// ----------------------------------------------------------------------

export default function DiseaseMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { IDDisease } = props;
  //
  const handleOpenEditDialog = () => {
    console.log("1");
    setOpenEdit(true);
  };
  //
  const handleCloseEdit = (isSuccessEdit) => {
    setOpenEdit(false);
    props.onClose(isSuccessEdit);
  };
  //
  const deleteDisease = () => {
    const getToken = localStorage.getItem("storeTokenAdmin");
    console.log("Token", getToken);
    console.log("DoctorMoreMenu", IDDisease);
    BackendAPI.delete(`/api/admin/disease/${IDDisease}`, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((json) => {
        console.log(json);
        alert("Delete disease success!");
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
        <EditDiseaseDialog
          open={openEdit}
          onCloseEdit={handleCloseEdit}
          IDDisease={IDDisease}
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
              deleteDisease();
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
