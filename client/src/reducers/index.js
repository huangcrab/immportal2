import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errReducer from "./errReducer";
import profileReducer from "./profileReducer";
import applicationReducer from "./applicationReducer";
import applicationFormReducer from "./applicationFormReducer";

export default combineReducers({
  auth: authReducer,
  errors: errReducer,
  profile: profileReducer,
  application: applicationReducer,
  applicationForm: applicationFormReducer
});
