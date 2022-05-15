import axios from 'axios'
import {
    DISEASE_LIST_FAIL, DISEASE_LIST_REQUEST, DISEASE_LIST_SUCCESS, DISEASE_ADD_FAIL, DISEASE_ADD_REQUEST, DISEASE_ADD_SUCCESS, DISEASE_DELETE_FAIL,
    DISEASE_DELETE_REQUEST, DISEASE_DELETE_SUCCESS, DISEASE_DETAILS_FAIL, DISEASE_DETAILS_REQUEST, DISEASE_DETAILS_SUCCESS, DISEASE_SAVE_FAIL, DISEASE_SAVE_REQUEST
    , DISEASE_SAVE_SUCCESS
} from '../constants/diseaseConstants';

const config = {
    headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
};

const listDiseases = (currentPage, limit) => async (dispatch) => {
    try {
        dispatch({ type: DISEASE_LIST_REQUEST });
        const { data } = await axios.get(`api/diseases?offset=${currentPage}&limit=${limit}`);
        dispatch({ type: DISEASE_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: DISEASE_LIST_FAIL, payload: message });
    }
}

const saveDisease = (diseaseId, disease) => async (dispatch) => {
    try {
        dispatch({ type: DISEASE_SAVE_REQUEST, payload: disease });
        const { data } = await axios.put(`/api/diseases/id=${diseaseId}`, disease, config);
        dispatch({ type: DISEASE_SAVE_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: DISEASE_SAVE_FAIL, payload: message });
    }
}

const addDisease = (disease) => async (dispatch) => {
    try {
        dispatch({ type: DISEASE_ADD_REQUEST, payload: disease });
        const { data } = await axios.post('/api/diseases', disease, config);
        dispatch({ type: DISEASE_ADD_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: DISEASE_ADD_FAIL, payload: message });
    }
}
const deleteDisease = (diseaseId) => async (dispatch) => {
    try {
        dispatch({ type: DISEASE_DELETE_REQUEST, payload: diseaseId });
        const { data } = await axios.delete('/api/diseases/id=' + diseaseId, config);
        dispatch({ type: DISEASE_DELETE_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: DISEASE_DELETE_FAIL, payload: message });
    }
}
const detailDisease = (diseaseId) => async (dispatch) => {
    try {
        dispatch({ type: DISEASE_DETAILS_REQUEST, payload: diseaseId });
        const { data } = await axios.get('/api/diseases/id=' + diseaseId, config);
        dispatch({ type: DISEASE_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: DISEASE_DETAILS_FAIL, payload: message });
    }
}

export { listDiseases,deleteDisease,detailDisease,saveDisease,addDisease }