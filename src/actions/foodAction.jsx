import axios from 'axios'
import {
    FOOD_LIST_FAIL, FOOD_LIST_REQUEST, FOOD_LIST_SUCCESS, FOOD_ADD_FAIL, FOOD_ADD_REQUEST, FOOD_ADD_SUCCESS, FOOD_DELETE_FAIL,
    FOOD_DELETE_REQUEST, FOOD_DELETE_SUCCESS, FOOD_DETAILS_FAIL, FOOD_DETAILS_REQUEST, FOOD_DETAILS_SUCCESS, FOOD_SAVE_FAIL, FOOD_SAVE_REQUEST
    , FOOD_SAVE_SUCCESS
} from '../constants/foodConstansts'

const config = {
    headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
};

const listFoods = (currentPage, limit) => async (dispatch) => {
    try {
        dispatch({ type: FOOD_LIST_REQUEST });
        const { data } = await axios.get(`api/food?offset=${currentPage}&limit=${limit}`);
        dispatch({ type: FOOD_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: FOOD_LIST_FAIL, payload: message });
    }
}

const saveFood = (foodId, food) => async (dispatch) => {
    try {
        dispatch({ type: FOOD_SAVE_REQUEST, payload: food });
        const { data } = await axios.put(`/api/food/id=${foodId}`, food, config);
        dispatch({ type: FOOD_SAVE_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: FOOD_SAVE_FAIL, payload: message });
    }
}

const addFood = (food) => async (dispatch) => {
    try {
        dispatch({ type: FOOD_ADD_REQUEST, payload: food });
        const { data } = await axios.post('/api/food', food, config);
        dispatch({ type: FOOD_ADD_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: FOOD_ADD_FAIL, payload: message });
    }
}
const deleteFood = (foodId) => async (dispatch) => {
    try {
        dispatch({ type: FOOD_DELETE_REQUEST, payload: foodId });
        const { data } = await axios.delete('/api/food/id=' + foodId, config);
        dispatch({ type: FOOD_DELETE_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: FOOD_DELETE_FAIL, payload: message });
    }
}
const detailFood = (foodId) => async (dispatch) => {
    try {
        dispatch({ type: FOOD_DETAILS_REQUEST, payload: foodId });
        const { data } = await axios.get('/api/food/id=' + foodId, config);
        dispatch({ type: FOOD_DETAILS_SUCCESS, payload: data.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: FOOD_DETAILS_FAIL, payload: message });
    }
}

export { listFoods,deleteFood,detailFood,saveFood,addFood }