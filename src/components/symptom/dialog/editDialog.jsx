import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from "react";
import { detailSymptom, saveSymptom } from "../../../actions/symptomAction";
import { useDispatch, useSelector } from "react-redux";
import { listDiseases } from "../../../actions/diseaseAction";

export function EditSymptomDialog(props) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        props.onCloseEdit();
    }
    const {success:successEdit} = useSelector(state=>state.symptomSave);
    const dispatch = useDispatch();
    const symptomDetail = useSelector(state => state.symptomDetail);
    const { symptom, loading, error } = symptomDetail;
    const diseaseList = useSelector(state => state.diseaseList);
    const { diseases, loadinga, errora } = diseaseList;
    let [nameUpdate, setNameUpdate] = useState(props.name);
    let [diseasesUpdate, setSymptomsUpdate] = useState(symptom?symptom.diseases:[])
    useEffect(async () => {
        await dispatch(detailSymptom(props.id));
        setOpen(props.open);
        dispatch(listDiseases(0, 1500))
    }, [props.open]);
    const handleUpdate = async () => {
        if(nameValidate()){
        await dispatch(saveSymptom(props.id, {name:nameUpdate,diseases:diseasesUpdate}));
        props.onCloseEdit(successEdit);
    }
    }
    const [nameError,setNameError] = useState("");
    const nameValidate = () => {
        if (nameUpdate.trim().length < 2 || nameUpdate.trim().length > 50) {
            setNameError("Name length from 2 - 50 characters ");
            return false;
        }
        else {
            setNameError('');
            return true;
        }
    } 
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit symptom</DialogTitle>
            <DialogContent sx={{ minWidth: 500 }}>
                {symptom && <Formik>
                    <Form style={{ marginTop: 20 }}>
                        <TextField
                            error={nameError} 
                            helperText={nameError ? nameError : ''} 
                            id="outlined-multiline-flexible"
                            label="Name of Disease"
                            defaultValue={symptom.name}
                            onChange={(e) => { setNameUpdate(e.target.value) }}
                            sx={{ width: '100%' }}
                        />
                        {diseases && (
                            <Autocomplete
                                multiple
                                id="multiple-limit-tags"
                                limitTags={2}
                                options={diseases}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                defaultValue={diseasesUpdate}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => { setSymptomsUpdate(value) }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Diseases" placeholder="Pick Diseases" />
                                )}
                                sx={{ mt: 3 }}
                            />)}

                        <Box sx={{ mt: 3, textAlign: 'right' }}>
                            <Button variant="outlinedInherit" startIcon={<DeleteIcon />}
                                onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="outlined" startIcon={<UpdateIcon />} sx={{ ml: 3 }}
                                onClick={handleUpdate}
                            >
                                Update
                            </Button>
                        </Box>
                    </Form>
                </Formik>}
            </DialogContent>
        </Dialog>
    );

}