import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from "react";
import { listSymptoms } from "../../../actions/symptomAction";
import { useDispatch, useSelector } from "react-redux";
import { detailDisease, saveDisease } from "../../../actions/diseaseAction";

export function EditDiseaseDialog(props) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        props.onCloseEdit();
    }
    const dispatch = useDispatch();
    const diseaseDetail = useSelector(state => state.diseaseDetail);
    const { disease, loading, error } = diseaseDetail;
    const symptomList = useSelector(state => state.symptomList);
    const { symptoms, loadinga, errora } = symptomList;
    let [nameUpdate, setNameUpdate] = useState(props.name);
    let [descriptionUpdate, setDescriptionUpdate] = useState(props.description);
    let [symptomsUpdate, setSymptomsUpdate] = useState(disease?disease.symptoms:[])
    const {success:successEdit} = useSelector(state=>state.diseaseSave);
    useEffect(async () => {
        await dispatch(detailDisease(props.id));
        await dispatch(listSymptoms(0, 350))
        setOpen(props.open);
    }, [props.open]);
    const handleUpdate = async () => {
        if(nameValidate()&&descriptionValidate())
        {
        await dispatch(saveDisease(props.id, {name:nameUpdate,description:descriptionUpdate,symptoms:symptomsUpdate}));
        props.onCloseEdit(successEdit);
        }
    }
    const [nameError,setNameError] = useState("");
    const nameValidate = () => {
        if (nameUpdate.trim().length < 2 || nameUpdate.trim().length > 500) {
            setNameError("Name length from 2 - 500 characters ");
            return false;
        }
        else {
            setNameError('');
            return true;
        }
    } 
    const [descriptionError,setdescriptionError] = useState("");
    const descriptionValidate = () => {
        if (descriptionUpdate.trim().length < 5 || descriptionUpdate.trim().length > 5000) {
            setdescriptionError("Description length from 5 - 5000 characters ");
            return false;
        }
        else {
            setdescriptionError('');
            return true;
        }
    } 
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit disease</DialogTitle>
            <DialogContent sx={{ minWidth: 500 }}>
                {disease && <Formik>
                    <Form style={{ marginTop: 20 }}>
                        <TextField
                            error={nameError} 
                            helperText={nameError ? nameError : ''} 
                            id="outlined-error"
                            label="Name of Disease"
                            defaultValue={disease.name}
                            onChange={(e) => { setNameUpdate(e.target.value) }}
                            sx={{ width: '100%' }}
                        />
                        <TextField
                            error={descriptionError} 
                            helperText={descriptionError ? descriptionError : ''}
                            id="outlined-multiline-flexible"
                            label="Description"
                            defaultValue={disease.description}
                            onChange={(e) => { setDescriptionUpdate(e.target.value) }}
                            multiline
                            minRows={4}
                            sx={{ width: '100%', mt: 3 }}
                        />
                        {symptoms && (
                            <Autocomplete
                                multiple
                                id="multiple-limit-tags"
                                limitTags={2}
                                options={symptoms}
                                defaultValue={symptomsUpdate}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => { setSymptomsUpdate(value) }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Symptoms" placeholder="Pick Symptoms" />
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