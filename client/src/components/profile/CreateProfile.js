import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      birthday: "",
      birthCity: "",
      birthCountry: "",
      citizenship: "",
      language: "",
      maritalStatus: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      birthday: this.state.birthday,
      birthCity: this.state.birthCity,
      birthCountry: this.state.birthCountry,
      citizenship: this.state.citizenship,
      language: this.state.language,
      maritalStatus: this.state.maritalStatus
    };
    this.props.createProfile(profileData, this.props.history);
  };
  render() {
    const { errors } = this.state;
    //select options for status

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's get some info about you</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextField
                  required
                  name="firstName"
                  label="First Name"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />{" "}
                <TextField
                  required
                  name="lastName"
                  label="Last Name"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />{" "}
                <TextField
                  select
                  required
                  label="Gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  helperText="Please select your gender"
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
                <br />
                <TextField
                  required
                  name="birthday"
                  label="Birthday"
                  type="date"
                  onChange={this.onChange}
                  value={this.state.birthday}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />{" "}
                <TextField
                  required
                  name="birthCity"
                  label="Birth City"
                  value={this.state.birthCity}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />{" "}
                <TextField
                  required
                  name="birthCountry"
                  label="Birth Country"
                  value={this.state.birthCountry}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />{" "}
                <TextField
                  required
                  name="citizenship"
                  label="Citizenship"
                  value={this.state.citizenship}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />
                <br />
                <TextField
                  required
                  name="language"
                  label="Language"
                  value={this.state.language}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                />
                <br />
                <TextField
                  select
                  required
                  name="maritalStatus"
                  label="Marital Status"
                  value={this.state.maritalStatus}
                  onChange={this.onChange}
                  helperText="Please select your Marital Status"
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem value="male">Married</MenuItem>
                  <MenuItem value="female">Single</MenuItem>
                  <MenuItem value="other">Common-Law</MenuItem>
                </TextField>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-outline-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
