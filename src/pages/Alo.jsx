import DashboardLayout from "../components/dashboardDoctor/DashboardLayout";
import ThemeConfig from "../components/theme";
import { styled } from "@mui/material/styles";
import DiseaseListHead from "../components/disease/DiseaseListHead";
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
const TABLE_HEAD = [
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
export default function Alo(props) {
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
              Notification
            </Typography>
          </Stack>
        </Container>
        <Card>
          <TableContainer sx={{ minWidth: 800, maxHeight: 400 }}>
            <Table>
              <DiseaseListHead headLabel={TABLE_HEAD} />
              <TableBody>
                <StyledTableRow hover>
                  <TableCell align="left" width={750}></TableCell>
                  <TableCell align="left" width={750}></TableCell>
                  <TableCell align="left" width={750}></TableCell>
                  <TableCell align="left" width={750}></TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </DashboardLayout>
    </ThemeConfig>
  );
}
