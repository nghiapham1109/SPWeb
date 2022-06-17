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
import Select from "react-select";

export function AddDayBusyDialog(props) {
  //
  const [timeBusy, setTimeBusy] = useState("08:00-09:00");
  const [dayBusy, setDayBusy] = useState("");
  const [note, setNote] = useState("");

  const handleClose = () => {
    props.onCloseAdd();
  };
  const createDayBusy = () => {
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
    BackendAPI.post("/api/daybusy/create", data, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((json) => {
        console.log(json);
        alert("Add note success!");
        props.onAddSuccess();
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  };
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add new day</DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <Formik>
          <Form style={{ marginTop: 20 }}>
            <label for="noteDay">Enter a date for your day busy:</label>
            <input
              id="noteDay"
              type="date"
              style={{ width: "100%", mt: 3 }}
              value={dayBusy}
              onChange={(e) => setDayBusy(e.target.value)}
            />
            <label for="noteDay" style={{ mt: 3, height: "100%",}}>
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
            {/* <TextField
              id="outlined-multiline-flexible"
              label="Time"
              sx={{ width: "100%" }}
              onChange={(e) => setTimeBusy(e.target.value)}
            /> */}
            {/* <TextField
              id="outlined-multiline-flexible"
              label="Day"
              sx={{ width: "100%", mt: 3 }}
              onChange={(e) => setDayBusy(e.target.value)}
            /> */}
            <TextField
              id="outlined-multiline-flexible"
              label="Note"
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
                startIcon={<AddCircleOutlineIcon />}
                sx={{ ml: 3 }}
                onClick={() => {
                  createDayBusy();
                }}
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
