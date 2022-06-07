import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  InputLabel,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export function AddSymptomDialog(props) {
  const [openAdd, setOpenAdd] = useState(false);
  const handleClose = () => {
    props.onCloseAdd();
  };
  //   const handleAdd = async () => {};
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add new Doctor</DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <Formik>
          <Form style={{ marginTop: 20 }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Name of Doctor"
              sx={{ width: "100%" }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Day Of Birth"
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Sex"
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Phone"
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Home Address"
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Specialist"
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Hospital"
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Hospital Address"
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Image"
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Email"
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Password"
              sx={{ width: "100%", mt: 3 }}
            />
            <Box sx={{ mt: 3, textAlign: "right" }}>
              <Button
                variant="outlinedInherit"
                startIcon={<DeleteIcon />}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                sx={{ ml: 3 }}
              >
                Add
              </Button>
            </Box>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
