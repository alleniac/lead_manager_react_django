import {
  GET_LEADS,
  ADD_LEAD,
  DELETE_LEAD,
  LOGOUT_SUCCESS,
} from '../actions/types';

const initialState = {
  leads: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload,
      };
    case ADD_LEAD:
      return {
        ...state,
        leads: [...state.leads, action.payload],
      };
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id !== action.payload),
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        leads: [],
      };
    default:
      return state;
  }
};
