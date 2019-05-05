import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaGroup";
import { createForm } from "../../actions/applicationFormActions";

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      decription: "",
      validation: {},
      fields: {},
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      decription: this.state.description,
      validation: this.state.validation,
      fields: this.state.fields
    };
    this.props.createForm(formData, this.props.history);
  };
  render() {
    const { errors } = this.state;
    //select options for status

    return (
      <div className="create-form">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Create new Application Form
              </h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Application Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <TextAreaFieldGroup
                  placeholder="Application Form description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="About the application form"
                />

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
CreateForm.propTypes = {
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
)(withRouter(CreateForm));
