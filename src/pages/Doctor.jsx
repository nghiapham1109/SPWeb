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
  TextField,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
import SearchBar from "material-ui-search-bar";
const TABLE_HEAD = [
  // { id: "IDDoctor", label: "ID", alignRight: false },
  { id: "NameDoctor", label: "Name", alignRight: false },
  { id: "Sex", label: "Gender", alignRight: false },
  { id: "Hospital", label: "Hospital", alignRight: false },
  { id: "Specialist", label: "Specialist", alignRight: false },
  { id: "Phone", label: "Phone", alignRight: false },
  { id: "action", label: "Action", alignRight: false },
];

// ----------------------------------------------------------------------
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
  const [data1, setData1] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [arrayHolder, setArrayHolder] = useState([]);
  const [value, setValue] = useState();
  //
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
  //
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
        setArrayHolder(json.data);
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
  let searchFilterFunction = (text) => {
    setValue(text);
    if (data1?.length !== 0) {
      const newData = arrayHolder.filter((item) => {
        const itemData = `${item.NameDoctor.toString().toUpperCase()}`;
        console.log("Search Doctor", itemData);
        const textData = text.toString().toUpperCase();
        // console.log(textData);
        return itemData.indexOf(textData) > -1;
      });
      console.log("New data", newData);

      setData1(newData);
    }
  };
  //
  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAdd(false);
    props.onClose();
  };
  //
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
          {/* <SymptomListToolbar /> */}
          <TextField
            label="Search Doctor...."
            style={{ margin: 10, right: 420 }}
            onChange={(e) => searchFilterFunction(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon>Search</SearchIcon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TableContainer sx={{ minWidth: 800, maxHeight: 400 }}>
            <Table>
              <SymptomListHead headLabel={TABLE_HEAD} />
              <TableBody>
                {data1?.map((item, idx, props) => {
                  return (
                    <StyledTableRow key={idx} hover>
                      <TableCell align="left" width={750}>
                        {item.NameDoctor}
                      </TableCell>
                      <TableCell align="left" width={750}>
                        {item.sex}
                      </TableCell>
                      <TableCell align="left" width={750}>
                        {item.Hospital}
                      </TableCell>
                      <TableCell align="left" width={750}>
                        {item.Specialist}
                      </TableCell>
                      <TableCell align="left" width={750}>
                        {item.Phone}
                      </TableCell>
                      <TableCell align="left" width={100}>
                        <DoctorMoreMenu
                          IDDoctor={item.IDDoctor}
                          onDeleteSuccess={() => {
                            setRerender(!reRender);
                          }}
                          onUpdateSuccess={() => {
                            setRerender(!reRender);
                          }}
                        />
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
