import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { GET_LEADS, ADD_LEAD, DELETE_LEAD, GET_ERRORS } from './types';

export const getLeads = () => dispatch => {
  axios
    .get('/api/leads/')
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addLead = lead => dispatch => {
  axios
    .post('/api/leads/', lead, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      dispatch(createMessage({ addLead: 'Lead added' }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteLead = id => dispatch => {
  axios
    .delete(`/api/leads/${id}`)
    .then(() => {
      dispatch(createMessage({ deleteLead: 'Lead deleted' }));
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch(err => console.log(err));
};
