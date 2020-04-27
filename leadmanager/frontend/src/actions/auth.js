import axios from 'axios';
import { returnErrors } from './messages';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from './types';

// Check the token and load the user
export const loadUser = () => (dispatch, getState) => {
  // User loading, set isLoading to true
  dispatch({ type: USER_LOADING });

  // Get request
  axios
    .get('api/auth/user', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// User login
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Body
  const body = JSON.stringify({ username, password });

  // Login POST request
  axios
    .post('api/auth/login', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: LOGIN_FAIL });
    });
};

// Logout user
export const logout = () => (dispatch, getState) => {
  // Get request
  axios
    .post('api/auth/logout', null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Helper function: Setup config with token
export const tokenConfig = (getState) => {
  // Get token trom state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to config.headers
  if (token) {
    config.headers['Authorization'] = `TOKEN ${token}`;
  }

  return config;
};
