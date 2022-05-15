import { filter } from "lodash";
import { useEffect, useState } from "react";
import { deleteSymptom, listSymptoms } from "../actions/symptomAction";
import { styled } from '@mui/material/styles';
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import plusFill from '@iconify/icons-eva/plus-fill';
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
} from '@mui/material';
import Scrollbar from "../components/dashboard/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import TablePaginationActions from "../components/TablePagination";
import { Icon } from "@iconify/react";
import SymptomListToolbar from "../components/symptom/SymptomListToolbar";
import SymptomListHead from "../components/symptom/SymptomListHead";
import SymptomMoreMenu from "../components/symptom/SymptomMoreMenu";
import { AddSymptomDialog } from "../components/symptom/dialog/addDialog";
import ReactLoading from 'react-loading';
import './css/common.css'
import { REMOVE_SELECTED_SYMPTOM } from "../constants/symptomConstants";
const TABLE_HEAD = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'action', label: 'Action', alignRight: false }
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
    return order === 'desc'
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
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: "rgb(255, 247, 205)",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const StyledTablePagination = withStyles((theme) => ({
    root: {
        "& .MuiTablePagination-toolbar": {
            position: "relative !important",
            marginRight: 90
        },
    },
}))(TablePagination);

export default function Symptom(props) {
    const symptomList = useSelector(state => state.symptomList);
    const { symptoms, loading, error } = symptomList;
    const dispatch = useDispatch();
    let [currentPage, setCurrentPage] = useState(0);
    let [limit, setLimit] = useState(1500);
    let [isUpdated, setUpdate] = useState(0);
    useEffect(() => {
        dispatch(listSymptoms(currentPage, limit))
    }, [dispatch, isUpdated])
    const [orderBy, setOrderBy] = useState('id');
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = symptoms.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleDelete = async (id) => {
        await dispatch(deleteSymptom(id));
        setSuccessDelete(true);
        setUpdate(isUpdated + 1);
      }
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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - symptoms.length) : 0;
    const [filterName, setFilterName] = useState('');
    const filteredDisease = applySortFilter(symptoms, getComparator(order, orderBy), filterName);
    const isDiseaseNotFound = symptoms.length === 0;
    let [openAdd, setOpenAdd] = useState(false)

    const handleCloseAdd = async(successAddForm) => {
        if(successAddForm){
            await setSuccessAdd(true);
        }
        setOpenAdd(false);
        setUpdate(isUpdated + 1);
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleOpenAddDialog = () => {
        setOpenAdd(true);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };
    const [successEdit,setSuccessEdit] = useState(false);
    const [successAdd,setSuccessAdd] = useState(false);
    const [successDelete,setSuccessDelete] = useState(false);
    const handleCloseEdit = async(successEditForm) => {
        if(successEditForm){
           await setSuccessEdit(true);
        }
        setUpdate(isUpdated + 1);
    }
    const handleCloseMessageEdit = () =>{
        dispatch({type:REMOVE_SELECTED_SYMPTOM});
        setSuccessEdit(false);
    }
    const handleCloseMessageAdd = () =>{
        dispatch({type:REMOVE_SELECTED_SYMPTOM});
        setSuccessAdd(false);
    }
    const handleCloseMessageDelete = () =>{
        dispatch({type:REMOVE_SELECTED_SYMPTOM});
        setSuccessDelete(false);
      }
    return (
        <DashboardLayout>
            {
                <AddSymptomDialog open={openAdd} onClose={handleCloseAdd} />
            }
            {
                <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={successEdit}
                onClose={handleCloseMessageEdit}

            >
                <Alert onClose={handleCloseMessageEdit} severity="success" sx={{ width: '100%' }}>
                    {"Edit Succees!"}
                </Alert>
            </Snackbar>
            }
            {
            <Snackbar
            autoHideDuration={2000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={successDelete}
            onClose={handleCloseMessageDelete}
            >
                <Alert onClose={handleCloseMessageDelete} severity="success" sx={{ width: '100%' }}>
                    {"Delete Succees!"}
                </Alert>
            </Snackbar>
            }
            {
                <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={successAdd}
                onClose={handleCloseMessageAdd}

            >
                <Alert onClose={handleCloseMessageAdd} severity="success" sx={{ width: '100%' }}>
                    {"Add Succees!"}
                </Alert>
            </Snackbar>
            }
            <Container style={{maxHeight:550}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Symptom
                    </Typography>
                    <Button
                        sx={{ backgroundColor: '#00AB55' }}
                        variant="contained"
                        to="#"
                        startIcon={<Icon sx={{ color: 'black' }} icon={plusFill} />}
                        onClick={() => { handleOpenAddDialog() }}
                    >
                        New Symptom
                    </Button>
                </Stack>
                {loading? <ReactLoading className="load" type='spinningBubbles' color='lightgreen'/>: 
                <Card>
                <SymptomListToolbar
                            numSelected={selected.length}
                            filterName={filterName}
                            onFilterName={handleFilterByName}
                        />
                    <TableContainer sx={{ minWidth: 800,maxHeight:400 }}>
                        <Table>
                            <SymptomListHead
                                headLabel={TABLE_HEAD}
                                rowCount={symptoms.length}
                                order={order}
                                orderBy={orderBy}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {filteredDisease
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        const { id, name, diseases, description } = row;
                                        const isItemSelected = selected.indexOf(name) !== -1;
                                        return (
                                            <StyledTableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        onChange={(event) => handleClick(event, name)}
                                                    />
                                                </TableCell>
                                                <TableCell align="left" width={100}>{id}</TableCell>
                                                <TableCell align="left" width={750}>{name}</TableCell>
                                                <TableCell align="left" width={100} >
                                                    <SymptomMoreMenu onDelete={() => handleDelete(id)} id={row.id} name={row.name}
                                                        description={row.description} diseases={row.diseases} onClose={handleCloseEdit}/>
                                                </TableCell>
                                            </StyledTableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <StyledTablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={symptoms.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { "aria-label": "rows per page" },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </Card>}
            </Container>
        </DashboardLayout>
    );
}