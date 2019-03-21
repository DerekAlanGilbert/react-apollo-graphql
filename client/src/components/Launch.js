import React, { Component, Fragment } from "react";
import { Card, List } from "antd";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import classNames from "classnames";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

export class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return (
      <Fragment>
        <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            const {
              mission_name,
              flight_number,
              launch_year,
              launch_success,
              rocket: { rocket_id, rocket_name, rocket_type }
            } = data.launch;
            return (
              <Card
                title={
                  <h3>
                    <span style={{ marginRight: "10px" }}>Mission:</span>
                    {mission_name}
                  </h3>
                }
                extra={<Link to="/">Go Back</Link>}
                style={{ width: "100%" }}
              >
                <List size="small" bordered>
                  <List.Item> Flight Number: {flight_number}</List.Item>
                  <List.Item> Launch Year: {launch_year}</List.Item>
                  <List.Item>
                    {" "}
                    Lanch Sucess:{" "}
                    <span
                      className={classNames({
                        success: launch_success,
                        failure: !launch_success
                      })}
                    >
                      {launch_success ? "Yes" : "No"}
                    </span>
                  </List.Item>
                </List>

                <List size="small" bordered style={{ marginTop: "20px" }}>
                  <List.Item> Rocket ID: {rocket_id}</List.Item>
                  <List.Item> Rocket Name: {rocket_name}</List.Item>
                  <List.Item> Rocket Type: {rocket_type}</List.Item>
                </List>
              </Card>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launch;
