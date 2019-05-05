import React, { Component } from "react";
import { connect } from "react-redux";

import { getApplicationForm } from "../../actions/applicationFormActions";
import TextFieldGroup from "../common/TextFieldGroup";

import { createApplication } from "../../actions/applicationActions";

class CreateApplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.applicationForm.fields
    };
  }

  componentDidMount() {
    this.props.getApplicationForm(this.props.match.params.id);
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onCheckChange = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };
  onSubmit = e => {
    e.preventDefault();
    const applicationData = {
      applicationForm: this.props.match.params.id,
      populatedFields: { ...this.state }
    };
    this.props.createApplication(applicationData, this.props.history);
  };
  render() {
    const { applicationForm } = this.props;
    return (
      <div className="create-application">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Create new Application for {applicationForm.name}
              </h1>
              <p className="lead text-center">{applicationForm.description}</p>
              <form onSubmit={this.onSubmit}>
                {applicationForm.fields
                  ? Object.keys(applicationForm.fields).map(key => {
                      return (
                        <TextFieldGroup
                          placeholder={key.toUpperCase()}
                          name={key}
                          value={this.state[key]}
                          onChange={this.onChange}
                          type={key.indexOf("day") !== -1 ? "date" : "text"}
                        />
                      );
                    })
                  : null}

                {applicationForm.validation && applicationForm.validation.has
                  ? Object.keys(applicationForm.validation.has).map(key => {
                      return (
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name={key}
                            onChange={this.onCheckChange}
                          />
                          <label
                            className="form-check-label"
                            for="defaultCheck1"
                          >
                            Do you have a {key.toUpperCase()}
                          </label>
                        </div>
                      );
                    })
                  : null}

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

const mapStateToProps = state => ({
  applicationForm: state.applicationForm.applicationForm,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getApplicationForm, createApplication }
)(CreateApplication);
