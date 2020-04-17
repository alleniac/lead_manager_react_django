import axios from 'axios';
import { returnErrors } from './messages';
import { USER_LOADED, USER_LOADING, AUTH_ERROR } from './types';

// Check the token and load the user
export const loadUser = () => (dispatch, getState) => {
  // User loading, set isLoading to true
  dispatch({ type: USER_LOADING });

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

  // Get request
  axios
    .get('api/auth/user', config)
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
