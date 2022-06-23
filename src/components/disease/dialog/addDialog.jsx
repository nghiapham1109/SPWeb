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
import BackendAPI from "../../../api/HttpClient";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//
export function AddDiseaseDialog(props) {
  const [open, setOpen] = useState(false);
  //
  const [nameDisease, setNameDisease] = useState("");
  const [decription, setDecription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [cause, setCause] = useState("");
  const [risk, setRisk] = useState("");
  const [complication, setComplication] = useState("");
  const [preparing, setPreparing] = useState("");
  const [tests, setTests] = useState("");
  const [treatment, setTreatment] = useState("");
  const [lifeStyle, setLifeStyle] = useState("");
  const [prevention, setPrevention] = useState("");
  //
  const handleClose = () => {
    props.onCloseAdd();
  };
  //
  const createDisease = () => {
    const getToken = localStorage.getItem("storeTokenAdmin");
    console.log("Token", getToken);
    const decode = jwt_decode(getToken);
    const IDAdmin = decode.result.IDAdmin;
    const data = {
      nameDisease,
      decription,
      symptoms,
      cause,
      risk,
      complication,
      preparing,
      tests,
      treatment,
      lifeStyle,
      prevention,
    };
    console.log("dataEdit", data);
    BackendAPI.post("/api/admin/disease", data, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((json) => {
        console.log(json);
        // alert("Add disease success!");
        props.onAddSuccess();
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  };
  //
  const notify = () => {
    toast.success("Add Disease Success!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  //
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
              onChange={(e) => setNameDisease(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setDecription(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Symptoms"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Cause"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setCause(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Risk"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setRisk(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Complication"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setComplication(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Preparing"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setPreparing(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Test"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setTests(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Treatment"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setTreatment(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Prevention"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setPrevention(e.target.value)}
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
                onClick={() => {
                  notify();
                  createDisease();
                }}
              >
                Add
              </Button>
              <ToastContainer />
            </Box>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
