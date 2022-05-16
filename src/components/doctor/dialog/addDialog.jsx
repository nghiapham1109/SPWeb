import { Autocomplete, Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormLabel, InputLabel, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSymptom, listSymptoms } from "../../../actions/symptomAction";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export function AddSymptomDialog(props) {
    const [open, setOpen] = React.useState(false);
    const diseaseList = useSelector(state => state.diseaseList);
    const { diseases, loading, error } = diseaseList;
    const {success:successAdd} = useSelector(state=>state.symptomAdd);
    let [nameAdd,setNameAdd]= useState("");
    let [diseasesAdd,setDiseasesAdd]=useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);
    const handleClose = () => {
        props.onClose();
    }
    const handleAdd = async () =>{
        if(nameValidate()){
        await dispatch(addSymptom({name:nameAdd,diseases:diseasesAdd}));
        props.onClose(successAdd);
        }
    }
    const [nameError,setNameError] = useState("");
    const nameValidate = () => {
        if (nameAdd.trim().length < 2 || nameAdd.trim().length > 50) {
            setNameError("Name length from 2 - 50 characters ");
            return false;
        }
        else {
            setNameError('');
            return true;
        }
    } 
    return (
        <Dialog open={open} onClose={() => handleClose()} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add new symptom</DialogTitle>
            <DialogContent sx={{ minWidth: 500 }}>
                <Formik>
                    <Form style={{ marginTop: 20 }}>
                        <TextField
                            error={nameError} 
                            helperText={nameError ? nameError : ''} 
                            id="outlined-multiline-flexible"
                            label="Name of Symptom"
                            onChange={(e)=>{setNameAdd(e.target.value)}}
                            sx={{ width: '100%' }}
                        />
                        {diseases && (
                            <Autocomplete
                                multiple
                                id="multiple-limit-tags"
                                limitTags={2}
                                options={diseases}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField {...params} label="Diseases" placeholder="Diseases" />
                                )}
                                sx={{ mt: 3 }}
                                onChange={(event, value) => {setDiseasesAdd(value)}}
                            />)}
                        <Box sx={{mt:3,textAlign:'right'}}>
                            <Button variant="outlinedInherit" startIcon={<DeleteIcon />} onClick={()=>handleClose()} >
                                Cancel
                            </Button>
                            <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} sx={{ml:3}}
                                onClick={handleAdd}
                            >
                                Add
                            </Button>
                        </Box>
                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>
    );
}