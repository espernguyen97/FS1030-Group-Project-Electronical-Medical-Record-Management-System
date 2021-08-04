import React, { useEffect, useState } from "react";
import parseJwt from "../../../helpers/authHelper";
import { Container } from "reactstrap";
import { Table, Button, Row } from "reactstrap";
import PageviewIcon from '@material-ui/icons/Pageview';
import { useHistory } from "react-router";
import moment from "moment";
import { useLocation } from "react-router-dom";



const ScheduleList = () => {
  const token = sessionStorage.getItem("token");
  const user = parseJwt(token).username;
  const [schedule, setschedule] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const scheduleID = location.state.PatientID;

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:4000/schedule/${scheduleID}`, {
        method: "GET",
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setschedule(data);
    };
    getData();
  }, [token]);

  const scheduleViewRoute = (event, schedule) => {
    event.preventDefault();
    let path = `/schedule/${schedule.scheduleID}`
    history.push(path, schedule);
  }
 

  return (
    <Container className="mainContent">
      <Row className="userTitle">
        <h2 className="display-5">
          Appointments:
          {user}
        </h2>
      </Row>
      <Table responsive className="content">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Doctor</th>
          </tr>
        </thead>
        <tbody>
          {schedule.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                <i>No appointments found for user</i>
              </td>
            </tr>
          )}
          {schedule.length > 0 &&
            schedule.map((schedule) => (
              <tr>
                <td>{moment(schedule.Date).format("YYYY-MM-DD")}</td>
                <td>{schedule.Timeslot}</td>
                <td>{schedule.Username}</td>
                <td>
                  {" "}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ScheduleList;
