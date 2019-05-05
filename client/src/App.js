import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearProfile } from "./actions/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";

import Landing from "./components/layouts/Landing";
import NotFound from "./components/layouts/NotFound";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Footer from "./components/layouts/Footer";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layouts/Navbar";
import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile/CreateProfile";
import AddEducation from "./components/profile/AddEducation";
import AddEmployment from "./components/profile/AddEmployment";
import Applications from "./components/application/Applications";
import Application from "./components/application/Application";
import CreateApplication from "./components/application/CreateApplication";

//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout the user
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearProfile());
    //redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
              allowed={["agent", "admin"]}
            />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/applications" component={Applications} />
            <PrivateRoute
              exact
              path="/create-application/:id"
              component={CreateApplication}
            />
            <PrivateRoute
              exact
              path="/application/:id"
              component={Application}
            />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
            <PrivateRoute
              exact
              path="/add-employment"
              component={AddEmployment}
            />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
