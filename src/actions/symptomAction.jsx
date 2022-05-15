import axios from 'axios'
import {
    SYMPTOM_LIST_FAIL, SYMPTOM_LIST_REQUEST, SYMPTOM_LIST_SUCCESS, SYMPTOM_ADD_FAIL, SYMPTOM_ADD_REQUEST, SYMPTOM_ADD_SUCCESS, SYMPTOM_DELETE_FAIL,
    SYMPTOM_DELETE_REQUEST, SYMPTOM_DELETE_SUCCESS, SYMPTOM_DETAILS_FAIL, SYMPTOM_DETAILS_REQUEST, SYMPTOM_DETAILS_SUCCESS, SYMPTOM_SAVE_FAIL, SYMPTOM_SAVE_REQUEST
    , SYMPTOM_SAVE_SUCCESS
} from '../constants/symptomConstants';

const config = {
    headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
};

const listSymptoms = (currentPage, limit) => async (dispatch) => {
    try {
        dispatch({ type: SYMPTOM_LIST_REQUEST });
        const { data } = await axios.get(`api/symptoms?offset=${currentPage}&limit=${limit}`);
        dispatch({ type: SYMPTOM_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: SYMPTOM_LIST_FAIL, payload: message });
    }
}

const saveSymptom = (symptomId, symptom) => async (dispatch) => {
    try {
        dispatch({ type: SYMPTOM_SAVE_REQUEST, payload: symptom });
        const { data } = await axios.put(`/api/symptoms/id=${symptomId}`, symptom, config);
        dispatch({ type: SYMPTOM_SAVE_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: SYMPTOM_SAVE_FAIL, payload: message });
    }
}

const addSymptom = (symptom) => async (dispatch) => {
    try {
        dispatch({ type: SYMPTOM_ADD_REQUEST, payload: symptom });
        const { data } = await axios.post('/api/symptoms', symptom, config);
        dispatch({ type: SYMPTOM_ADD_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: SYMPTOM_ADD_FAIL, payload: message });
    }
}
const deleteSymptom = (symptomId) => async (dispatch) => {
    try {
        dispatch({ type: SYMPTOM_DELETE_REQUEST, payload: symptomId });
        const { data } = await axios.delete('/api/symptoms/id=' + symptomId, config);
        dispatch({ type: SYMPTOM_DELETE_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: SYMPTOM_DELETE_FAIL, payload: message });
    }
}
const detailSymptom = (symptomId) => async (dispatch) => {
    try {
        dispatch({ type: SYMPTOM_DETAILS_REQUEST, payload: symptomId });
        const { data } = await axios.get('/api/symptoms/id=' + symptomId, config);
        dispatch({ type: SYMPTOM_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: SYMPTOM_DETAILS_FAIL, payload: message });
    }
}

export { listSymptoms,deleteSymptom,detailSymptom,saveSymptom,addSymptom }