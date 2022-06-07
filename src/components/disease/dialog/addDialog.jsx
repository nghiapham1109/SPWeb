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

export function AddDiseaseDialog(props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    props.onCloseAdd();
  };
  const handleAdd = async () => {};
  const [descriptionError, setdescriptionError] = useState("");
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add new disease</DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <Formik>
          <Form style={{ marginTop: 20 }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Name of Disease"
              sx={{ width: "100%" }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Symptoms"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Cause"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Risk"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Complication"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Preparing"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Test"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Treatment"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Life Style"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Prevention"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
            />
            <Box sx={{ mt: 3, textAlign: "right" }}>
              <Button
                variant="outlinedInherit"
                startIcon={<DeleteIcon />}
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                sx={{ ml: 3 }}
                onClick={handleAdd}
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
