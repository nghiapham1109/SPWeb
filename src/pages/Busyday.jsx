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
import SymptomListToolbar from "../components/doctor/DoctorListToolbar";
import SymptomListHead from "../components/doctor/DoctorListHead";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
export default function Busyday(props) {
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
              Busy day notes
            </Typography>
            <Button
              sx={{ backgroundColor: "#00AB55" }}
              variant="contained"
              to="#"
              startIcon={<Icon sx={{ color: "black" }} icon={plusFill} />}
              // onClick={() => {
              //   handleOpenAddDialog();
              // }}
            >
              New day
            </Button>
          </Stack>
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
              <Flexbox flexGrow={1}>You have appointment at 14:15</Flexbox>
            </div>
            <div
              style={{
                flex: 1,
                width: 300,
                height: 300,
                borderRadius: 10,
                margin: 20,
                backgroundColor: "#BFF1E5",
              }}
            >
              <Flexbox flexGrow={1}>You have appointment at 14:15</Flexbox>
            </div>
            <div
              style={{
                flex: 1,
                width: 300,
                height: 300,
                borderRadius: 10,
                margin: 20,
                backgroundColor: "#BFF1E5",
              }}
            >
              <Flexbox flexGrow={1}>You have appointment at 14:15</Flexbox>
            </div>
            <div
              style={{
                flex: 1,
                width: 300,
                height: 300,
                borderRadius: 10,
                margin: 20,
                backgroundColor: "#BFF1E5",
              }}
            >
              <Flexbox flexGrow={1}>You have appointment at 14:15</Flexbox>
            </div>
            <div
              style={{
                flex: 1,
                width: 300,
                height: 300,
                borderRadius: 10,
                margin: 20,
                backgroundColor: "#BFF1E5",
              }}
            >
              <Flexbox flexGrow={1}>You have appointment at 14:15</Flexbox>
            </div>
          </Flexbox>
        </Container>
      </DashboardLayout>
    </ThemeConfig>
  );
}
