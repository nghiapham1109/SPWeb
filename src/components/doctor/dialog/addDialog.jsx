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
import Alert from "react-bootstrap/Alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//
export function AddSymptomDialog(props) {
  const [openAdd, setOpenAdd] = useState(false);
  //
  const [nameDoctor, setNameDoctor] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [phone, setPhone] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [hospital, setHospital] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [image, setImage] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //
  const createDoctor = () => {
    const getToken = localStorage.getItem("storeTokenAdmin");
    console.log("Token", getToken);
    const decode = jwt_decode(getToken);
    const IDAdmin = decode.result.IDAdmin;
    const DATA = {
      nameDoctor,
      dayOfBirth,
      sex,
      phone,
      homeAddress,
      hospital,
      hospitalAddress,
      image,
      specialist,
      email,
      password,
    };

    BackendAPI.post("/api/admin", DATA, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((json) => {
        console.log(json);
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
  const handleClose = () => {
    props.onCloseAdd();
  };
  //
  const notify = () => {
    toast.success("Add Doctor Success!", {
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
      <DialogTitle id="form-dialog-title">Add new Doctor</DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <Formik>
          <Form style={{ marginTop: 20 }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Name of Doctor"
              sx={{ width: "100%" }}
              onChange={(e) => setNameDoctor(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Day Of Birth"
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setDayOfBirth(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Sex"
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setSex(e.target.value)}
            />

            <TextField
              id="outlined-multiline-flexible"
              label="Phone"
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Home Address"
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setHomeAddress(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Specialist"
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setSpecialist(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Hospital"
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setHospital(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Hospital Address"
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setHospitalAddress(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Image"
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setImage(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Email"
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Password"
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setPassword(e.target.value)}
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
                onClick={() => {
                  notify();
                  createDoctor();
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
