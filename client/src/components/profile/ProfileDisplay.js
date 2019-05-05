import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";

import { createProfile } from "../../actions/profileActions";

class ProfileDisplay extends PureComponent {
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
      disabled: true
    };
  }
  componentDidMount() {
    this.loadProfile();
  }

  loadProfile() {
    this.setState({ ...this.props.profile });
  }

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
    window.location.reload();
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onEditClick = e => {
    this.loadProfile();
    this.setState({ disabled: !this.state.disabled });
  };
  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <TextField
            required
            disabled={this.state.disabled}
            name="firstName"
            label="First Name"
            value={this.state.firstName}
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
          />{" "}
          <TextField
            required
            disabled={this.state.disabled}
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
            disabled={this.state.disabled}
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
            disabled={this.state.disabled}
            name="birthday"
            label="Birthday"
            type="date"
            onChange={this.onChange}
            value={moment(this.state.birthday).format("YYYY-MM-DD")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />{" "}
          <TextField
            required
            disabled={this.state.disabled}
            name="birthCity"
            label="Birth City"
            value={this.state.birthCity}
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
          />{" "}
          <TextField
            required
            disabled={this.state.disabled}
            name="birthCountry"
            label="Birth Country"
            value={this.state.birthCountry}
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
          />{" "}
          <TextField
            required
            disabled={this.state.disabled}
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
            disabled={this.state.disabled}
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
            disabled={this.state.disabled}
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
          {this.state.disabled ? null : (
            <input
              type="submit"
              value="Submit"
              className="btn btn-outline-info btn-block mt-4"
            />
          )}
        </form>
        <br />
        <button className="btn btn-light" onClick={this.onEditClick}>
          <i className="fas fa-user-circle text-info mr-1" />
          {this.state.disabled ? "Edit Profile" : "Reset Profile"}
        </button>
      </>
    );
  }
}
ProfileDisplay.propTypes = {
  profile: PropTypes.object.isRequired
};

export default connect(
  null,
  { createProfile }
)(withRouter(ProfileDisplay));
