import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCurrentProfile,
  deleteEmployment,
  deleteEducation
} from "../../actions/profileActions";

import ProfileDisplay from "./ProfileDisplay";
import EducationDisplay from "./EducationDisplay";
import EmploymentDisplay from "./EmploymentDisplay";
import Spinner from "../common/Spinner";

class Profile extends PureComponent {
  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let content;

    if (profile === null || loading) {
      content = <Spinner />;
    } else {
      //check if user has a profile
      if (Object.keys(profile).length > 0) {
        content = (
          <div className="row">
            <div className="col-md-6">
              <p className="lead text-muted">Welcome {user.nickname}</p>
              <ProfileDisplay profile={profile} />
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12">
                  {profile.education.length > 0 ? (
                    <EducationDisplay educations={profile.education} />
                  ) : null}
                  <br />
                  <Link to="/add-education" className="btn btn-light">
                    <i className="fab fa-black-tie text-info mr-1" />
                    Add Education
                  </Link>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-12">
                  {profile.employment.length > 0 ? (
                    <EmploymentDisplay employments={profile.employment} />
                  ) : null}
                  <br />
                  <Link to="/add-employment" className="btn btn-light">
                    <i className="fab fa-black-tie text-info mr-1" />
                    Add Employment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        content = (
          <div>
            <p className="lead text-muted">Welcome {user.nickname}</p>
            <p>You have not setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-outline-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <>
        <div className="container">{content}</div>
      </>
    );
  }
}
Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteEmployment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteEmployment, deleteEducation }
)(Profile);
