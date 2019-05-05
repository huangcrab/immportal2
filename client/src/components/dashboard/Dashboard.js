import React, { PureComponent } from "react";
import styled from "styled-components";
import Chart from "../common/Chart";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import { LineChart, Line, XAxis, Tooltip, CartesianGrid } from "recharts";
import { getApplications } from "../../actions/applicationActions";
import { getApplicationForms } from "../../actions/applicationFormActions";

const CardImageOverlay = styled.div`
  background: rgba(255, 255, 255, 0.5);
`;

const ListView = styled.div`
  height: 80vh;
`;

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayCate: "all"
    };
  }
  componentDidMount() {
    this.props.getApplicationForms();
    this.props.getApplications();
  }

  onButtonClick = name => {
    this.setState({ displayCate: name });
  };
  render() {
    const { applications, applicationForms } = this.props;
    const { displayCate } = this.state;
    let display = [];
    if (displayCate !== "all") {
      display = applications.filter(
        app => app.applicationForm.name === displayCate
      );
    } else {
      display = applications;
    }
    const map = [];

    display.forEach(application => {
      const time = moment(application.createAt).format("YYYY-MM-DD");

      if (map[time]) {
        map[time]++;
      } else {
        map[time] = 1;
      }
    });
    const data = [];
    Object.keys(map).forEach(key => {
      data.push({
        date: key,
        count: map[key]
      });
    });
    // const data = map[Symbol.iterator]();
    console.log(data);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="col-md-12 text-right">
              <h3 className="card-title ">Choose your Category</h3>
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
              <button
                onClick={this.onButtonClick.bind(this, "all")}
                className="btn btn-outline-secondary btn-lg mr-3"
              >
                All
              </button>
              {applicationForms.length > 0
                ? applicationForms.map(form => {
                    return (
                      <button
                        onClick={this.onButtonClick.bind(this, form.name)}
                        className="btn btn-outline-secondary btn-lg mr-3"
                      >
                        {form.name.toUpperCase()}
                      </button>
                    );
                  })
                : "There is no forms"}
              {/* <Link
                to="/create-form"
                className="btn btn-outline-secondary btn-lg mr-3"
              >
                <i className="fa fa-plus" />
              </Link> */}
            </div>
            <div className="col-md-12">
              {/* Data Visual */}
              <Chart data={data} dataKey="date" domainY={[0, data.length]}>
                <Line
                  strokeWidth={2}
                  legendType="triangle"
                  name={this.state.displayCate.toUpperCase()}
                  dot={false}
                  dataKey="count"
                  type="monotone"
                  connectNulls={true}
                  stroke="#00e64d"
                />
              </Chart>
            </div>
          </div>
          <ListView className="col-md-6 overflow-auto">
            <div className="list-group">
              {display.length > 0
                ? display.map(application => {
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
)(Dashboard);
