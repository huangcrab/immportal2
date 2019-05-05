import {
  GET_APPLICATION_FORM,
  GET_APPLICATION_FORMS,
  APPLICATION_FORM_LOADING
} from "../actions/types";
const initialState = {
  applicationForm: {},
  applicationForms: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case APPLICATION_FORM_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_APPLICATION_FORM:
      return {
        ...state,
        applicationForm: action.payload,
        loading: false
      };
    case GET_APPLICATION_FORMS:
      return {
        ...state,
        applicationForms: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
