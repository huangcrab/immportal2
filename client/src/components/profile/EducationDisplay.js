import React, { PureComponent } from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteEducation } from "../../actions/profileActions";

class EducationDisplay extends PureComponent {
  onDeleteClick = id => {
    this.props.deleteEducation(id);
  };
  render() {
    return (
      <>
        {this.props.educations.map(education => {
          return (
            <React.Fragment key={education._id}>
              <div className="card shadow">
                <div className="card-body">
                  <p className="card-title">{education.school}</p>
                  <strong>{education.degree}</strong> of {education.major}
                  <p className="card-text">
                    {moment(education.from).format("YYYY-MM-DD")} ---{" "}
                    {education.current
                      ? "Current"
                      : moment(education.to).format("YYYY-MM-DD")}
                    <button
                      onClick={this.onDeleteClick.bind(this, education._id)}
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

EducationDisplay.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(EducationDisplay);
