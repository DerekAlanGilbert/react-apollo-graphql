import React from "react";
import { Card, Button } from "antd";
import classNames from "classnames";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function LaunchItem({
  launch: { flight_number, mission_name, launch_date_local, launch_success }
}) {
  return (
    <Card
      title={
        <h3 style={{ marginRight: "10px" }}>
          Mission:
          <span
            className={classNames({
              success: launch_success,
              failure: !launch_success
            })}
          >
            {mission_name}
          </span>
        </h3>
      }
      extra={
        <Link to={`/launch/${flight_number}`} type="primary">
          Launch Details
        </Link>
      }
      style={{ width: "100%", margin: "15px 10px" }}
    >
      <p>
        Date: <Moment format="YYY-MM-DD HH:mm">{launch_date_local}</Moment>
      </p>
      <p />
    </Card>
  );
}
