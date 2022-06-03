import DashboardLayout from "../components/dashboardDoctor/DashboardLayout";
import ThemeConfig from "../components/theme";
import { filter } from "lodash";
import Flexbox from "flexbox-react";
import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  ThemeProvider,
  Snackbar,
  Alert,
} from "@mui/material";
import SymptomListToolbar from "../components/doctor/DoctorListToolbar";
import SymptomListHead from "../components/doctor/DoctorListHead";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import BackendAPI from "../api/HttpClient";
import jwt_decode from "jwt-decode";
export default function Appointment(props) {
  const [data, setData] = useState([]);

  const getBooking = () => {
    const getToken = localStorage.getItem("storeToken");
    const decode = jwt_decode(getToken);
    const IDDoctor = decode.result.IDDoctor;
    BackendAPI.get(`/api/booking/${IDDoctor}`, {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((json) => {
        setData(json.data.data);
        console.log(json.data.data);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  };
  useEffect(() => {
    getBooking();
  }, []);

  return (
    <ThemeConfig>
      <DashboardLayout>
        <Container style={{ maxHeight: 550 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Appointment
            </Typography>
          </Stack>
          {data.map((item, idx) => {
            return (
              <Flexbox flexDirection="row" flex="1" flexWrap="wrap" key={idx}>
                <Flexbox
                  element="header"
                  style={{
                    padding: 30,
                    flex: 1,
                    width: 300,
                    height: 300,
                    borderRadius: 10,
                    margin: 20,
                    backgroundColor: "#BFF1E5",
                    shadowColor: "rgba(0, 0, 0, 1)",
                    shadowOpacity: 100,
                    shadowRadius: 100,
                    elevation: 10,
                  }}
                >
                  {item.IDBooking} {item.IDDoctor} {item.TimeBooking} {item.Note}
                </Flexbox>
              </Flexbox>
            );
          })}
        </Container>
      </DashboardLayout>
    </ThemeConfig>
  );
}
