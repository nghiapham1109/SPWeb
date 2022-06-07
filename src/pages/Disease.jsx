import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
// import {
//   deleteDisease,
//   listDiseases,
//   saveDisease,
// } from "../actions/diseaseAction";
import { filter } from "lodash";
import { styled } from "@mui/material/styles";
import plusFill from "@iconify/icons-eva/plus-fill";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import DiseaseListHead from "../components/disease/DiseaseListHead";
import DiseaseMoreMenu from "../components/disease/DiseaseMoreMenu";
import DiseaseListToolbar from "../components/disease/DiseaseListToolbar";
// import renderHTML from "react-render-html";
import { Icon } from "@iconify/react";
import ThemeConfig from "../components/theme";
import { AddDiseaseDialog } from "../components/disease/dialog/addDialog";
import ReactLoading from "react-loading";
import "./css/common.css";
import { REMOVE_SELECTED_DISEASE } from "../constants/diseaseConstants";
const TABLE_HEAD = [
  { id: "IDDisease", label: "ID", alignRight: false },
  { id: "NameDisease", label: "Disease", alignRight: false },
  { id: "Decription", label: "Description", alignRight: false },
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
export default function Disease(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getToken = localStorage.getItem("storeTokenAdmin");
    const decode = jwt_decode(getToken);
    fetch("http://localhost:8080/api/admin/disease", {
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then((response) => response.json())
      .then((json) => {
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
  let [isUpdated, setUpdate] = useState(0);
  const [orderBy, setOrderBy] = useState("IDDisease");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  //

  let [openAdd, setOpenAdd] = useState(false);

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAdd(false);
    props.onClose();
  };
  //
  const [successEdit, setSuccessEdit] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  //
  const handleCloseAdd = async (successAddForm) => {
    if (successAddForm) {
      await setSuccessAdd(true);
    }
    setOpenAdd(false);
    setUpdate(isUpdated + 1);
  };
  const handleDelete = async (id) => {
    // await dispatch(deleteDisease(id));
    // setSuccessDelete(true);
    // setUpdate(isUpdated + 1);
  };
  const handleCloseEdit = async (successEditForm) => {
    if (successEditForm) {
      await setSuccessEdit(true);
    }
    setUpdate(isUpdated + 1);
  };
  const handleCloseMessageEdit = () => {
    // dispatch({ type: REMOVE_SELECTED_DISEASE });
    // setSuccessEdit(false);
  };
  const handleCloseMessageAdd = () => {
    // dispatch({ type: REMOVE_SELECTED_DISEASE });
    // setSuccessAdd(false);
  };
  const handleCloseMessageDelete = () => {
    // dispatch({ type: REMOVE_SELECTED_DISEASE });
    // setSuccessDelete(false);
  };
  return (
    <DashboardLayout>
      {<AddDiseaseDialog open={openAdd} onCloseAdd={handleCloseAddDialog} />}
      {
        <Snackbar
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={successEdit}
          onClose={handleCloseMessageEdit}
        >
          <Alert
            onClose={handleCloseMessageEdit}
            severity="success"
            sx={{ width: "100%", backgroundColor: "green", color: "white" }}
          >
            {"Edit Succees!"}
          </Alert>
        </Snackbar>
      }
      {
        <Snackbar
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={successDelete}
          onClose={handleCloseMessageDelete}
        >
          <Alert
            onClose={handleCloseMessageDelete}
            severity="success"
            sx={{ width: "100%", backgroundColor: "green", color: "white" }}
          >
            {"Delete Succees!"}
          </Alert>
        </Snackbar>
      }
      {
        <Snackbar
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={successAdd}
          onClose={handleCloseMessageAdd}
        >
          <Alert
            onClose={handleCloseMessageAdd}
            severity="success"
            sx={{ width: "100%", backgroundColor: "green", color: "white" }}
          >
            {"Add Succees!"}
          </Alert>
        </Snackbar>
      }
      <Container style={{ maxHeight: 550 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Disease
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
            New Disease
          </Button>
        </Stack>
        <Card>
          <DiseaseListToolbar numSelected={selected.length} />
          <TableContainer sx={{ minWidth: 800, maxHeight: 400 }}>
            <Table>
              <DiseaseListHead headLabel={TABLE_HEAD} />
              <TableBody>
                {data?.map((item, idx) => {
                  return (
                    <StyledTableRow key={idx} hover>
                      <TableCell align="left" width={100}>
                        {item.IDDisease}
                      </TableCell>
                      <TableCell align="left" width={750}>
                        {item.NameDisease}
                      </TableCell>
                      <TableCell align="left" width={750}>
                        {item.Decription}
                      </TableCell>
                      <TableCell align="left" width={100}>
                        <DiseaseMoreMenu />
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
