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
export function EditDayBusyDialog(props) {
  //
  const [data, setData] = useState([]);
  //
  const [timeBusy, setTimeBusy] = useState("");
  const [dayBusy, setDayBusy] = useState("");
  const [note, setNote] = useState("");
  //
  const IDDayBusy = props.IDDayBusy;
  console.log("edit", IDDayBusy);
  //
  const handleClose = () => {
    props.onCloseEdit();
  };
  const updateDayBusy = () => {
    const getToken = localStorage.getItem("storeToken");
    console.log("Token", getToken);
    const decode = jwt_decode(getToken);
    const IDDoctor = decode.result.IDDoctor;
    const data = {
      timeBusy,
      dayBusy,
      note,
    };
    console.log("dataEdit", data);
    BackendAPI.put(`/api/daybusy/update/${IDDayBusy}`, data, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((json) => {
        console.log(json);
        alert("Update note success!");
        props.onUpdateSuccess();
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  };
  useEffect(() => {
    const getToken = localStorage.getItem("storeToken");
    fetch(`http://localhost:8080/api/daybusy/info/${IDDayBusy}`, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setTimeBusy(json.data[0].TimeBusy);
        setDayBusy(json.data[0].DayBusy);
        setNote(json.data[0].Note);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  }, [IDDayBusy]);
  //
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
            {/* <TextField
              id="outlined-multiline-flexible"
              label="Time"
              defaultValue={timeBusy}
              sx={{ width: "100%" }}
              onChange={(e) => setTimeBusy(e.target.value)}
            ></TextField>
            <TextField
              id="outlined-multiline-flexible"
              label="Day"
              defaultValue={dayBusy}
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setDayBusy(e.target.value)}
            ></TextField> */}
            <label for="noteDay">Enter a date for your day busy:</label>
            <input
              id="noteDay"
              type="date"
              style={{ width: "100%", mt: 3 }}
              value={dayBusy}
              onChange={(e) => setDayBusy(e.target.value)}
            />
            <label for="noteDay" style={{ mt: 3, height: "100%" }}>
              Enter a date for your time busy:
            </label>
            <select
              name="TimeBusy"
              id="timeBusy"
              style={{ width: "100%", mt: 3 }}
              onChange={(e) => setTimeBusy(e.target.value)}
              value={timeBusy}
            >
              <option value="08:00-09:00">08:00-09:00</option>
              <option value="09:15-10:15">09:15-10:15</option>
              <option value="10:30-11:30">10:30-11:30</option>
              <option value="13:00-14:00">13:00-14:00</option>
              <option value="14:15-15:15">14:15-15:15</option>
              <option value="15:30-16:30">15:30-16:30</option>
            </select>
            <TextField
              id="outlined-multiline-flexible"
              label="Note"
              defaultValue={note}
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setNote(e.target.value)}
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
                  updateDayBusy();
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
