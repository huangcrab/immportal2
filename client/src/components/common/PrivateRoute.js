import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({
  component: Component,
  auth,
  allowed,
  all,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      allowed = allowed ? allowed : ["vip", "agent", "admin"];
      if (auth.isAuthenticated === true) {
        if (allowed.includes(auth.role)) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/applications" />;
        }
      } else {
        return <Redirect to="/login" />;
      }
    }}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
