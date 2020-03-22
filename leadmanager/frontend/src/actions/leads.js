import axios from 'axios';
import { createMessage } from './messages';
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
    .catch(err => console.log(err));
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
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
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
