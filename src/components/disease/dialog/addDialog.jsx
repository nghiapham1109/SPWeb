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
import { useDispatch, useSelector } from "react-redux";
import { listSymptoms } from "../../../actions/symptomAction";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { addDisease } from "../../../actions/diseaseAction";

export function AddDiseaseDialog(props) {
  const [open, setOpen] = React.useState(false);
  // const symptomList = useSelector(state => state.symptomList);
  // const { symptoms, loading, error } = symptomList;
  let [nameAdd, setNameAdd] = useState("");
  let [descriptionAdd, setDescriptionAdd] = useState("");
  let [symptomsAdd, setSymptomsAdd] = useState([]);
  const dispatch = useDispatch();
  const { success: successAdd } = useSelector((state) => state.diseaseAdd);
  useEffect(() => {
    setOpen(props.open);
    dispatch(listSymptoms(0, 350));
  }, [props.open]);
  const handleClose = () => {
    props.onClose();
  };
  const handleAdd = async () => {
    if (nameValidate() && descriptionValidate()) {
      await dispatch(
        addDisease({
          name: nameAdd,
          description: descriptionAdd,
          symptoms: symptomsAdd,
        })
      );
      props.onClose(successAdd);
    }
  };
  const [nameError, setNameError] = useState("");
  const nameValidate = () => {
    if (nameAdd.trim().length < 2 || nameAdd.trim().length > 50) {
      setNameError("Name length from 2 - 50 characters ");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };
  const [descriptionError, setdescriptionError] = useState("");
  const descriptionValidate = () => {
    if (descriptionAdd.trim().length < 5 || descriptionAdd.trim().length > 50) {
      setdescriptionError("Description length from 5 - 50 characters ");
      return false;
    } else {
      setdescriptionError("");
      return true;
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add new disease</DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <Formik>
          <Form style={{ marginTop: 20 }}>
            <TextField
              error={nameError}
              helperText={nameError ? nameError : ""}
              id="outlined-multiline-flexible"
              label="Name of Disease"
              onChange={(e) => {
                setNameAdd(e.target.value);
              }}
              sx={{ width: "100%" }}
            />
            <TextField
              error={descriptionError}
              helperText={descriptionError ? descriptionError : ""}
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              minRows={4}
              onChange={(e) => {
                setDescriptionAdd(e.target.value);
              }}
              sx={{ width: "100%", mt: 3 }}
            />
            {/* {symptoms && ()} */}
            <Autocomplete
              multiple
              id="multiple-limit-tags"
              limitTags={2}
              // options={symptoms}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Symptoms"
                  placeholder="Symptoms"
                />
              )}
              sx={{ mt: 3 }}
              onChange={(event, value) => {
                setSymptomsAdd(value);
              }}
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
