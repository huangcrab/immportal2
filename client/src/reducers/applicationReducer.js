import {
  GET_APPLICATION,
  GET_APPLICATIONS,
  APPLICATION_LOADING
} from "../actions/types";
const initialState = {
  application: {},
  applications: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case APPLICATION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_APPLICATION:
      return {
        ...state,
        application: action.payload,
        loading: false
      };
    case GET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
