import DashboardLayout from "../components/dashboardDoctor/DashboardLayout";
import ThemeConfig from "../components/theme";
import { filter } from "lodash";
import Flexbox from "flexbox-react";
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
import SymptomListToolbar from "../components/DayBusy/DayBusyToolbar";
import SymptomListHead from "../components/DayBusy/DayBusyListHead";
import SymptomMoreMenu from "../components/DayBusy/DayBusyMoreMenu";
import { AddDayBusyDialog } from "../components/DayBusy/dialog/addDialog";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import { styled } from "@mui/material/styles";
import jwt_decode from "jwt-decode";
import BackendAPI from "../api/HttpClient";
import { useEffect, useState } from "react";
//
const TABLE_HEAD = [
  { id: "TimeBusy", label: "Time", alignRight: false },
  { id: "DayBusy", label: "Day", alignRight: false },
  { id: "Note", label: "Note", alignRight: false },
  { id: "action", label: "Action", alignRight: false },
];
//
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "rgb(255, 247, 205)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function Busyday(props) {
  const [data, setData] = useState([]);

  const getBooking = () => {
    const getToken = localStorage.getItem("storeToken");
    const decode = jwt_decode(getToken);
    const IDDoctor = decode.result.IDDoctor;
    console.log(IDDoctor);
    BackendAPI.get(`/api/daybusy/${IDDoctor}`, {
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
        {<AddDayBusyDialog />}
        <Container style={{ maxHeight: 550 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Note
            </Typography>
            <Button
              sx={{ backgroundColor: "#00AB55" }}
              variant="contained"
              to="#"
              startIcon={<Icon sx={{ color: "black" }} icon={plusFill} />}
            >
              New day
            </Button>
          </Stack>
          <Card>
            <SymptomListToolbar />
            <TableContainer sx={{ minWidth: 800, maxHeight: 400 }}>
              <Table>
                <SymptomListHead headLabel={TABLE_HEAD} />
                {data.map((item, idx) => {
                  return (
                    <TableBody key={idx}>
                      <StyledTableRow hover>
                        <TableCell align="left" width={750}>
                          {item.TimeBusy}
                        </TableCell>
                        <TableCell align="left" width={750}>
                          {item.DayBusy}
                        </TableCell>
                        <TableCell align="left" width={750}>
                          {item.Note}
                        </TableCell>
                        <TableCell align="left" width={100}>
                          <SymptomMoreMenu IDDayBusy={item.IDDayBusy} />
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
