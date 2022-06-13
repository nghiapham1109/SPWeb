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
import DiseaseListHead from "../components/disease/DiseaseListHead";
import SymptomListHead from "../components/doctor/DoctorListHead";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import BackendAPI from "../api/HttpClient";
import { styled } from "@mui/material/styles";
import jwt_decode from "jwt-decode";
const TABLE_HEAD = [
  { id: "IDBooking", label: "ID", alignRight: false },
  { id: "TimeBooking", label: "Time", alignRight: false },
  { id: "DayBooking", label: "Day", alignRight: false },
  { id: "Note", label: "Note", alignRight: false },
  { id: "NamePatient", label: "Name Patient", alignRight: false },
];
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "rgb(255, 247, 205)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
//
export default function Appointment(props) {
  const [data, setData] = useState([]);
  //
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
          <Card>
            <TableContainer sx={{ minWidth: 800, maxHeight: 400 }}>
              <Table>
                <DiseaseListHead headLabel={TABLE_HEAD} />
                {data.map((item, idx) => {
                  return (
                    <TableBody key={idx}>
                      <StyledTableRow hover>
                        <TableCell align="left" width={100}>
                          {item.IDBooking}
                        </TableCell>
                        <TableCell align="left" width={750}>
                          {item.TimeBooking}
                        </TableCell>
                        <TableCell align="left" width={750}>
                          {item.DayBooking}
                        </TableCell>
                        <TableCell align="left" width={750}>
                          {item.Note}
                        </TableCell>
                        <TableCell align="left" width={750}>
                          {item.NamePatient}
                        </TableCell>
                      </StyledTableRow>
                    </TableBody>
                  );
                })}
              </Table>
            </TableContainer>
          </Card>
        </Container>
      </DashboardLayout>
    </ThemeConfig>
  );
}
