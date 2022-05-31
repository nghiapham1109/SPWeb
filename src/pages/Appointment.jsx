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
export default function Appointment(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/booking")
      .then((response) => response.json())
      .then((json) => {
        //vjp
        // ong code render 1 item di bro :v
        // ko, sua code duoi kia ay
        // la sao border
        setData(json.data);
        console.log(json.data);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        // ADD THIS THROW error
        throw error;
      });
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
            {/* <Button
              sx={{ backgroundColor: "#00AB55" }}
              variant="contained"
              to="#"
              startIcon={<Icon sx={{ color: "black" }} icon={plusFill} />}
              // onClick={() => {
              //   handleOpenAddDialog();
              // }}
            >
              New Appointment
            </Button> */}
          </Stack>
          {data.map((item, idx) => {
            return (
              <Flexbox flexDirection="row" flex="1" flexWrap="wrap">
                <div
                  style={{
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
                  <Flexbox flexGrow={0}>{item.IDBooking}</Flexbox>
                </div>
              </Flexbox>
            );
          })}
        </Container>
      </DashboardLayout>
    </ThemeConfig>
  );
}
