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
import BackendAPI from "../../../api/HttpClient";
import jwt_decode from "jwt-decode";
//
export function EditDiseaseDialog(props) {
  const [data, setData] = useState([]);
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
  const IDDisease = props.IDDisease;
  console.log(IDDisease);
  //
  const handleClose = () => {
    props.onCloseEdit();
  };
  //
  const updateDisease = () => {
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
    BackendAPI.put(`/api/admin/disease/${IDDisease}`, data, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((json) => {
        console.log(json);
        alert("Update disease success!");
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
    fetch(`http://localhost:8080/api/admin/disease/${IDDisease}`, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setNameDisease(json.data[0].NameDisease);
        setDecription(json.data[0].Decription);
        setSymptoms(json.data[0].Symptoms);
        setCause(json.data[0].Cause);
        setRisk(json.data[0].Risk);
        setComplication(json.data[0].Complication);
        setPreparing(json.data[0].Preparing);
        setTests(json.data[0].Tests);
        setTreatment(json.data[0].Treatment);
        setLifeStyle(json.data[0].LifeStyle);
        setPrevention(json.data[0].Prevention);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  }, [IDDisease]);
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit disease</DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <Formik>
          <Form style={{ marginTop: 20 }}>
            <TextField
              id="outlined-error"
              label="Name of Disease"
              sx={{ width: "100%" }}
              defaultValue={nameDisease}
              onChange={(e) => setNameDisease(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              defaultValue={decription}
              onChange={(e) => setDecription(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Cause"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              defaultValue={cause}
              onChange={(e) => setCause(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Risk"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              defaultValue={risk}
              onChange={(e) => setRisk(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Complication"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              defaultValue={complication}
              onChange={(e) => setComplication(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Preparing"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              defaultValue={preparing}
              onChange={(e) => setPreparing(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Tests"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              defaultValue={tests}
              onChange={(e) => setTests(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Treatment"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              defaultValue={treatment}
              onChange={(e) => setTreatment(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Life Style"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              defaultValue={lifeStyle}
              onChange={(e) => setLifeStyle(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Prevention"
              multiline
              minRows={4}
              sx={{ width: "100%", mt: 3 }}
              defaultValue={prevention}
              onChange={(e) => setPrevention(e.target.value)}
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
                  updateDisease();
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
