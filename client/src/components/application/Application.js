import React, { Component } from "react";
import { connect } from "react-redux";

import Moment from "react-moment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {
  getApplication,
  createApplication
} from "../../actions/applicationActions";

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }
  componentDidMount() {
    this.props.getApplication(this.props.match.params.id);
  }

  onSubmit = e => {
    e.preventDefault();
    const applicationData = {
      ...this.props.application.application,
      status: this.state.status
    };

    this.props.createApplication(applicationData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { application, loading } = this.props.application;
    const { isAg } = this.props.auth;
    return (
      <div className="application">
        {application ? (
          <div className="container">
            <div className="row">
              <div className="col-md-8 ">
                <h1 className="display-4 text-center">
                  Application for{" "}
                  {application.applicationForm
                    ? application.applicationForm.name
                    : null}
                </h1>
                <p className="lead text-center">
                  {application.applicationForm
                    ? application.applicationForm.description
                    : null}
                </p>
                <br />

                {application.populatedFields
                  ? Object.keys(application.populatedFields).map(key => {
                      return (
                        <p key={key} className="text-center al">
                          {key.toUpperCase()} :{" "}
                          {application.populatedFields[key].toString()}{" "}
                        </p>
                      );
                    })
                  : null}
              </div>
              <div className="col-md-4">
                {isAg ? (
                  <form onSubmit={this.onSubmit}>
                    <TextField
                      select
                      required
                      label="Status"
                      name="status"
                      value={this.state.status}
                      onChange={this.onChange}
                      helperText="Please update the status"
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem value="review">Review</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                    </TextField>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-outline-info ml-4 mt-4"
                    />
                  </form>
                ) : (
                  <p>Status: {application.status}</p>
                )}

                <p>
                  Submitted:{" "}
                  {<Moment format="YYYY-MM-DD">{application.createAt}</Moment>}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  application: state.application,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getApplication, createApplication }
)(Application);
