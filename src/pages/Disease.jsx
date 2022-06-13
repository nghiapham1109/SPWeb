import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
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
import SearchNotFound from "../components/SearchNotFound";
import DiseaseListHead from "../components/disease/DiseaseListHead";
import DiseaseMoreMenu from "../components/disease/DiseaseMoreMenu";
import DiseaseListToolbar from "../components/disease/DiseaseListToolbar";
// import renderHTML from "react-render-html";
import { Icon } from "@iconify/react";
import ThemeConfig from "../components/theme";
import { AddDiseaseDialog } from "../components/disease/dialog/addDialog";
import "./css/common.css";

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: "NameDisease", label: "Disease", alignRight: false },
  { id: "Decription", label: "Description", alignRight: false },
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
//
export default function Disease(props) {
  const [data, setData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [reRender, setRerender] = useState(false);
  //
  useEffect(() => {
    const getToken = localStorage.getItem("storeTokenAdmin");
    const decode = jwt_decode(getToken);
    console.log("Disease", decode);
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
  }, [reRender]);
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
        <AddDiseaseDialog
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
          <DiseaseListToolbar />
          <TableContainer sx={{ minWidth: 800, maxHeight: 400 }}>
            <Table>
              <DiseaseListHead headLabel={TABLE_HEAD} />
              <TableBody>
                {data?.map((item, idx) => {
                  return (
                    <StyledTableRow key={idx} hover>
                      <TableCell align="left" width={750}>
                        {item.NameDisease}
                      </TableCell>
                      <TableCell align="left" width={750}>
                        {item.Decription}
                      </TableCell>
                      <TableCell align="left" width={100}>
                        <DiseaseMoreMenu
                          IDDisease={item.IDDisease}
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
