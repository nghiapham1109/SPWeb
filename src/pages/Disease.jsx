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
  TextField,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import SearchNotFound from "../components/SearchNotFound";
import DiseaseListHead from "../components/disease/DiseaseListHead";
import DiseaseMoreMenu from "../components/disease/DiseaseMoreMenu";
import DiseaseListToolbar from "../components/disease/DiseaseListToolbar";
import { Icon } from "@iconify/react";
import ThemeConfig from "../components/theme";
import { AddDiseaseDialog } from "../components/disease/dialog/addDialog";
import "./css/common.css";
import parse from "html-react-parser";
import SearchIcon from "@mui/icons-material/Search";
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: "NameDisease", label: "Disease", alignRight: false },
  { id: "Decription", label: "Description", alignRight: false },
  // { id: "Cause", label: "Cause", alignRight: false },
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
  const [arrayHolder, setArrayHolder] = useState([]);
  const [value, setValue] = useState();
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
        setArrayHolder(json.data);
        console.log("Disease", json.data);
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
    console.log("array", arrayHolder);
    if (data?.length !== 0) {
      const newData = arrayHolder.filter((item) => {
        const itemData = `${item.NameDisease.toString().toUpperCase()}`;
        console.log("Search Disease", itemData);
        const textData = text.toString().toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log("New data", newData);

      setData(newData);
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
          {/* <DiseaseListToolbar /> */}
          <TextField
            label="Search Disease...."
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
              <DiseaseListHead headLabel={TABLE_HEAD} />
              <TableBody>
                {data?.map((item, idx) => {
                  return (
                    <StyledTableRow key={idx} hover>
                      <TableCell align="left" width={750}>
                        {item.NameDisease}
                      </TableCell>
                      <TableCell align="left" width={750}>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.Decription }}
                        />
                      </TableCell>
                      {/* <TableCell align="left" width={750}>
                        <div dangerouslySetInnerHTML={{ __html: item.Cause }} />
                      </TableCell> */}
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
