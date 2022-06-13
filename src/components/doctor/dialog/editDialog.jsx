import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Input,
} from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { detailSymptom, saveSymptom } from "../../../actions/symptomAction";
import { useDispatch, useSelector } from "react-redux";
import { listDiseases } from "../../../actions/diseaseAction";
import BackendAPI from "../../../api/HttpClient";
import jwt_decode from "jwt-decode";
import Alert from "react-bootstrap/Alert";
//
export function EditSymptomDialog(props) {
  const [data, setData] = useState([]);
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
  const IDDoctor = props.IDDoctor;
  //
  const handleClose = () => {
    props.onCloseEdit();
  };
  const updateDoctor = () => {
    const getToken = localStorage.getItem("storeTokenAdmin");
    console.log("Token", getToken);
    const decode = jwt_decode(getToken);
    const IDAdmin = decode.result.IDAdmin;
    const data = {
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
    console.log("dataEdit", data);
    console.log(IDDoctor);

    BackendAPI.put(`/api/admin/${IDDoctor}`, data, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((json) => {
        console.log(json);
        alert("Update doctor success!");
        props.onUpdateSuccess();
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  };
  //
  useEffect(() => {
    const getToken = localStorage.getItem("storeTokenAdmin");
    fetch(`http://localhost:8080/api/admin/${IDDoctor}`, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setNameDoctor(json.data[0].NameDoctor);
        setDayOfBirth(json.data[0].DayOfBirth);
        setSex(json.data[0].sex);
        setPhone(json.data[0].Phone);
        setHomeAddress(json.data[0].HomeAddress);
        setSpecialist(json.data[0].Specialist);
        setHospital(json.data[0].Hospital);
        setHospitalAddress(json.data[0].HospitalAddress);
        setImage(json.data[0].Image);
        setEmail(json.data[0].Email);
        setPassword(json.data[0].Pw);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  }, [IDDoctor]);
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
              defaultValue={nameDoctor}
              onChange={(e) => setNameDoctor(e.target.value)}
            ></TextField>
            <TextField
              id="outlined-multiline-flexible"
              label="Day of Birth"
              sx={{ width: "100%", mt: 3 }}
              defaultValue={dayOfBirth}
              onChange={(e) => setDayOfBirth(e.target.value)}
            ></TextField>
            <TextField
              id="outlined-multiline-flexible"
              label="Sex"
              sx={{ width: "100%", mt: 3 }}
              defaultValue={sex}
              onChange={(e) => setSex(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Phone"
              sx={{ width: "100%", mt: 3 }}
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Home Address"
              sx={{ width: "100%", mt: 3 }}
              defaultValue={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Specialist"
              sx={{ width: "100%", mt: 3 }}
              defaultValue={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Hospital"
              sx={{ width: "100%", mt: 3 }}
              defaultValue={hospital}
              onChange={(e) => setHospital(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Hospital Address"
              sx={{ width: "100%", mt: 3 }}
              defaultValue={hospitalAddress}
              onChange={(e) => {
                setHospitalAddress(e.target.value);
              }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Image"
              sx={{ width: "100%", mt: 3 }}
              defaultValue={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Email"
              sx={{ width: "100%", mt: 3 }}
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Password"
              sx={{ width: "100%", mt: 3 }}
              defaultValue={password}
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
                startIcon={<UpdateIcon />}
                sx={{ ml: 3 }}
                onClick={() => {
                  updateDoctor();
                }}
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
