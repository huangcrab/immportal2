import {
  GET_ERRORS,
  GET_APPLICATION_FORM,
  GET_APPLICATION_FORMS,
  APPLICATION_FORM_LOADING
} from "./types";
import axios from "axios";

//get current application
export const getApplicationForm = id => dispatch => {
  dispatch(setApplicationFormLoading());
  axios
    .get(`/api/applicationForms/${id}`)
    .then(res =>
      dispatch({
        type: GET_APPLICATION_FORM,
        payload: res.data.result
      })
    )
    .catch(err =>
      dispatch({
        type: GET_APPLICATION_FORM,
        payload: {}
      })
    );
};

//get applications
export const getApplicationForms = () => dispatch => {
  dispatch(setApplicationFormLoading());
  axios
    .get("/api/applicationForms")
    .then(res =>
      dispatch({
        type: GET_APPLICATION_FORMS,
        payload: res.data.result
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

//create application
export const createApplicationForm = (formData, history) => dispatch => {
  axios
    .post("/api/applicationForms", formData)
    .then(res => history.push("/applcations"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete
export const deleteApplicationForm = id => dispatch => {
  axios
    .delete(`api/applicationForms/${id}`)
    .then(res =>
      dispatch({
        type: GET_APPLICATION_FORMS,
        payload: res.data.result
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setApplicationFormLoading = () => {
  return {
    type: APPLICATION_FORM_LOADING
  };
};
