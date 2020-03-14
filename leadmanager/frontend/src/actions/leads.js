import axios from 'axios';

import { GET_LEADS, ADD_LEAD, DELETE_LEAD } from './types';

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
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const deleteLead = id => dispatch => {
  axios
    .delete(`/api/leads/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch(err => console.log(err));
};
