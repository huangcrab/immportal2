import {
  GET_ERRORS,
  GET_APPLICATION,
  GET_APPLICATIONS,
  APPLICATION_LOADING
} from "./types";
import axios from "axios";

//get current application
export const getApplication = id => dispatch => {
  dispatch(setApplicationLoading());
  axios
    .get(`/api/applications/${id}`)
    .then(res =>
      dispatch({
        type: GET_APPLICATION,
        payload: res.data.result
      })
    )
    .catch(err =>
      dispatch({
        type: GET_APPLICATION,
        payload: {}
      })
    );
};

//get applications
export const getApplications = () => dispatch => {
  dispatch(setApplicationLoading());
  axios
    .get("/api/applications")
    .then(res =>
      dispatch({
        type: GET_APPLICATIONS,
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
export const createApplication = (applicationData, history) => dispatch => {
  axios
    .post("/api/applications", applicationData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete
export const deleteApplication = id => dispatch => {
  axios
    .delete(`api/application/${id}`)
    .then(res =>
      dispatch({
        type: GET_APPLICATIONS,
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

export const setApplicationLoading = () => {
  return {
    type: APPLICATION_LOADING
  };
};
