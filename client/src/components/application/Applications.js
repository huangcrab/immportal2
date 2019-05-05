import React, { PureComponent } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getApplications } from "../../actions/applicationActions";
import { getApplicationForms } from "../../actions/applicationFormActions";

const CardImageOverlay = styled.div`
  background: rgba(255, 255, 255, 0.5);
`;

const ListView = styled.div`
  height: 80vh;
`;

class Applications extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      applications: [],
      applicationForms: []
    };
  }

  componentDidMount() {
    this.props.getApplicationForms();
    this.props.getApplications();
  }

  render() {
    const { applications, applicationForms } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="col-md-12 text-right">
              <h3 className="card-title ">Choose your Application</h3>
              {/* Category Description */}
              <div className="card bg-dark">
                <img
                  className="card-img"
                  src="https://picsum.photos/300/100"
                  alt="Card image"
                />
                <CardImageOverlay className="card-img-overlay">
                  <p className="card-text ">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p className="card-text">Last updated 3 mins ago</p>
                </CardImageOverlay>
              </div>
            </div>
            <div className="col-md-12 my-4">
              {applicationForms.length > 0
                ? applicationForms.map(form => {
                    return (
                      <Link
                        to={`/create-application/${form._id}`}
                        className="btn btn-outline-secondary btn-lg mr-3"
                      >
                        {form.name.toUpperCase()}
                      </Link>
                    );
                  })
                : "There is no forms"}
            </div>
          </div>
          <ListView className="col-md-6 overflow-auto">
            {/* Application List */}

            <div className="list-group">
              {applications.length > 0
                ? applications.map(application => {
                    return (
                      <Link
                        to={`/application/${application._id}`}
                        className="list-group-item list-group-item-action flex-column align-items-start mb-2"
                        key={application._id}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">
                            {application.applicationForm.name}
                          </h5>
                          <small>
                            {<Moment fromNow>{application.createAt}</Moment>}
                          </small>
                        </div>
                        <p className="mb-1">
                          Status: {application.status.toUpperCase()}
                        </p>
                        <p
                          className="mb-1"
                          className={
                            application.preApprove
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          Pre-Approve: {application.preApprove ? "Yes" : "No"}
                        </p>
                      </Link>
                    );
                  })
                : "No Submitted Applications"}
            </div>
          </ListView>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  applications: state.application.applications,
  applicationForms: state.applicationForm.applicationForms,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getApplicationForms, getApplications }
)(Applications);
