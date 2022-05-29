import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
import TablePaginationActions from "../components/TablePagination";
import { Icon } from "@iconify/react";
import ThemeConfig from "../components/theme";
// import { AddDiseaseDialog } from "../components/disease/dialog/addDialog";
import ReactLoading from "react-loading";
import "./css/common.css";
import { REMOVE_SELECTED_DISEASE } from "../constants/diseaseConstants";
const TABLE_HEAD = [
  { id: "IDDisease", label: "ID", alignRight: false },
  { id: "NameDisease", label: "Disease", alignRight: false },
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

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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
export default function Disease(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/disease")
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
  // const diseaseList = useSelector((state) => state.diseaseList);
  // const { diseases, loading, error } = diseaseList;
  // const dispatch = useDispatch();
  let [currentPage, setCurrentPage] = useState(0);
  let [limit, setLimit] = useState(1500);
  let [isUpdated, setUpdate] = useState(0);
  // useEffect(() => {
  //   dispatch(listDiseases(currentPage, limit));
  // }, [dispatch, isUpdated]);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  //
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    // if (event.target.checked) {
    //   const newSelecteds = diseases.map((n) => n.name);
    //   setSelected(newSelecteds);
    //   return;
    // }
    // setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  let [openAdd, setOpenAdd] = useState(false);

  const handleFilterByName = (event) => {
    // setFilterName(event.target.value);
  };

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
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
      {/* {<AddDiseaseDialog open={openAdd} onClose={handleCloseAdd} />} */}
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
          <DiseaseListToolbar
            numSelected={selected.length}
            // filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <TableContainer sx={{ minWidth: 800, maxHeight: 400 }}>
            <Table>
              <DiseaseListHead
                headLabel={TABLE_HEAD}
                //   rowCount={symptoms.length}
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {data.map((item, idx) => {
                  return (
                    <StyledTableRow key={idx} hover>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell align="left" width={100}>
                        {item.IDDisease}
                      </TableCell>
                      <TableCell align="left" width={750}>
                        {item.NameDisease}
                      </TableCell>
                      <TableCell align="left" width={100}>
                        <DiseaseMoreMenu />
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
                <TableRow style={{ height: 53 }}>
                  <TableCell colSpan={6} />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </DashboardLayout>
  );
}
