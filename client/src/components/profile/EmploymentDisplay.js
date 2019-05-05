import React, { PureComponent } from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteEmployment } from "../../actions/profileActions";

class EmploymentDisplay extends PureComponent {
  onDeleteClick = id => {
    this.props.deleteEmployment(id);
  };
  render() {
    return (
      <>
        {this.props.employments.map(employment => {
          return (
            <React.Fragment key={employment._id}>
              <div className="card shadow">
                <div className="card-body">
                  <p className="card-title">{employment.company}</p>
                  <strong>{employment.title}</strong>
                  <p className="card-text">
                    {moment(employment.from).format("YYYY-MM-DD")} ---{" "}
                    {employment.current
                      ? "Current"
                      : moment(employment.to).format("YYYY-MM-DD")}
                    <button
                      onClick={this.onDeleteClick.bind(this, employment._id)}
                      className="btn btn-outline-danger float-right"
                    >
                      Delete
                    </button>
                  </p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </>
    );
  }
}

EmploymentDisplay.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEmployment }
)(EmploymentDisplay);
