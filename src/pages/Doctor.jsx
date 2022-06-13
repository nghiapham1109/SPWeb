import { filter } from "lodash";
import { useEffect, useState } from "react";
import { deleteSymptom, listSymptoms } from "../actions/symptomAction";
import { styled } from "@mui/material/styles";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import plusFill from "@iconify/icons-eva/plus-fill";
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
import Scrollbar from "../components/dashboard/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import TablePaginationActions from "../components/TablePagination";
import { Icon } from "@iconify/react";
import SymptomListToolbar from "../components/doctor/DoctorListToolbar";
import SymptomListHead from "../components/doctor/DoctorListHead";
import DoctorMoreMenu from "../components/doctor/DoctorMoreMenu";
import { AddSymptomDialog } from "../components/doctor/dialog/addDialog";
import BackendAPI from "../api/HttpClient";
import jwt_decode from "jwt-decode";
import ReactLoading from "react-loading";
import "./css/common.css";
import { REMOVE_SELECTED_SYMPTOM } from "../constants/symptomConstants";
const TABLE_HEAD = [
  // { id: "IDDoctor", label: "ID", alignRight: false },
  { id: "NameDoctor", label: "Name", alignRight: false },
  { id: "Hospital", label: "Hospital", alignRight: false },
  { id: "Specialist", label: "Specialist", alignRight: false },
  { id: "action", label: "Action", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
//
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
//
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "rgb(255, 247, 205)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Symptom(props) {
  const [data, setData] = useState([]);
  const [reRender, setRerender] = useState(false);

  const getDoctorByAdmin = () => {
    const getToken = localStorage.getItem("storeTokenAdmin");
    const decode = jwt_decode(getToken);
    const IDAdmin = decode.result.IDAdmin;
    BackendAPI.get(`/api/booking/${IDAdmin}`, {
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
  useEffect(() => {
    getDoctorByAdmin();
  }, []);
  const [data1, setData1] = useState([]);
  useEffect(() => {
    const getToken = localStorage.getItem("storeTokenAdmin");
    const decode = jwt_decode(getToken);
    fetch("http://localhost:8080/api/admin", {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData1(json.data);
        console.log(json.data);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        // ADD THIS THROW error
        throw error;
      });
  }, [reRender]);
  //
  //

  //
  const [openAdd, setOpenAdd] = useState(false);
  //
  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAdd(false);
    props.onClose();
  };

  return (
    <DashboardLayout>
      {
        <AddSymptomDialog
          open={openAdd}
          onCloseAdd={handleCloseAddDialog}
          onAddSuccess={() => {
            setRerender(!reRender);
          }}
        />
      }
      <Container style={{ maxHeight: 550 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Doctor
          </Typography>
          <Button
            sx={{ backgroundColor: "#00AB55" }}
            variant="contained"
            to="#"
            startIcon={<Icon sx={{ color: "black" }} icon={plusFill} />}
            onClick={() => {
              handleOpenAddDialog();
            }}
          >
            New Doctor
          </Button>
        </Stack>
        <Card>
          <SymptomListToolbar />
          <TableContainer sx={{ minWidth: 800, maxHeight: 400 }}>
            <Table>
              <SymptomListHead
                headLabel={TABLE_HEAD}
                //   rowCount={symptoms.length}
              />
              <TableBody>
                {data1?.map((item, idx, props) => {
                  return (
                    <StyledTableRow key={idx} hover>
                      {/* <TableCell padding="checkbox">
                        <Checkbox value={item.IDDoctor} />
                      </TableCell> */}
                      <TableCell align="left" width={750}>
                        {item.NameDoctor}
                      </TableCell>
                      <TableCell align="left" width={750}>
                        {item.Hospital}
                      </TableCell>
                      <TableCell align="left" width={750}>
                        {item.Specialist}
                      </TableCell>
                      <TableCell align="left" width={100}>
                        <DoctorMoreMenu IDDoctor={item.IDDoctor} />
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </DashboardLayout>
  );
}
