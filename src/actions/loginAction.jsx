import * as actionTypes from '../constants/loginConstants.jsx';
import axios from 'axios';


const loginUrl = "/api/login";

export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST
  };
};

export const loginSuccess = (isSuccess, userId, token, fullName, role, email) => async (dispatch) => {   
  return {
    type: actionTypes.LOGIN_SUCCESS,
    isSuccess: isSuccess,
    userId: userId,
    token: token,
    fullName: fullName,
    role: role,
    email: email
  };

};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error
  };
};

export const login = (email, password) =>
  async dispatch => {
    dispatch(loginRequest());
    const loginData = {
      email: email,
      password: password
    };
    try {
      const response = await axios.post(loginUrl, loginData);
      dispatch(loginSuccess(response.data.isSuccess, response.data.data.id, response.data.data.token, response.data.data.fullName, response.data.data.role, response.data.data.email));
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', response.data.data.id);
      localStorage.setItem('role', response.data.data.role);
      localStorage.setItem('email', response.data.data.email);
      }
    catch (error) {
      dispatch(loginFail(error.response.data.message));
    }
  };