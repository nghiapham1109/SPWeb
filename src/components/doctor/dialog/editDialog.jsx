import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { detailSymptom, saveSymptom } from "../../../actions/symptomAction";
import { useDispatch, useSelector } from "react-redux";
import { listDiseases } from "../../../actions/diseaseAction";

export function EditSymptomDialog(props) {
  const handleClose = () => {
    props.onCloseEdit();
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit doctor</DialogTitle>
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
              label="Phone"
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Hospital"
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Specialist"
              sx={{ width: "100%", mt: 3 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Home Address"
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
                startIcon={<UpdateIcon />}
                sx={{ ml: 3 }}
              >
                Update
              </Button>
            </Box>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
