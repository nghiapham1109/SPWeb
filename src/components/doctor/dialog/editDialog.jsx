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
export function EditSymptomDialog(props) {
  const [data, setData] = useState([]);
  //
  const [nameDoctor, setNameDoctor] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [phone, setPhone] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [hospital, setHospitals] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [image, setImage] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [email, setEmail] = useState("");

  //
  const IDDoctor = props.IDDoctor;
  //
  const handleClose = () => {
    props.onCloseEdit();
  };
  const updateDoctor = () => {
    const getToken = localStorage.getItem("storeTokenAdmin");
    const decode = jwt_decode(getToken);
    const IDAdmin = decode.result.IDAdmin;
    BackendAPI.patch(`/api/admin/${IDDoctor}`, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((json) => {
        setData(json.data.data);
        // console.log(json.data.data);
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
        console.log("editDialog", json.data);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        // ADD THIS THROW error
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
        {data?.map((item, idx) => {
          return (
            <Formik key={idx}>
              <Form style={{ marginTop: 20 }}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Name of Doctor"
                  sx={{ width: "100%" }}
                  defaultValue={item.NameDoctor}
                ></TextField>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Day of Birth"
                  sx={{ width: "100%", mt: 3 }}
                  defaultValue={item.DayOfBirth}
                ></TextField>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Sex"
                  sx={{ width: "100%", mt: 3 }}
                  defaultValue={item.sex}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Phone"
                  sx={{ width: "100%", mt: 3 }}
                  defaultValue={item.Phone}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Home Address"
                  sx={{ width: "100%", mt: 3 }}
                  defaultValue={item.HomeAddress}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Specialist"
                  sx={{ width: "100%", mt: 3 }}
                  defaultValue={item.Specialist}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Hospital"
                  sx={{ width: "100%", mt: 3 }}
                  defaultValue={item.Hospital}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Hospital Address"
                  sx={{ width: "100%", mt: 3 }}
                  defaultValue={item.HospitalAddress}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Image"
                  sx={{ width: "100%", mt: 3 }}
                  defaultValue={item.Image}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Email"
                  sx={{ width: "100%", mt: 3 }}
                  defaultValue={item.Email}
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
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
