import React, { useEffect, useState } from "react";
import parseJwt from "../../../helpers/authHelper";
import { Container } from "reactstrap";
import { Table, Row,Collapse, Button, CardBody, Card } from "reactstrap";
import moment from "moment";
import { useLocation } from "react-router-dom";

const ScheduleList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const token = sessionStorage.getItem("token");
  const user = parseJwt(token).username;
  const [schedule, setschedule] = useState([]);
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
    getData();// eslint-disable-next-line 
  }, [token]);

  const today = new Date()

  const compareDates = (date) => {
    const dateToCheck = new Date(date)
    return dateToCheck.getTime() >= today.getTime()
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
            <th>{" "}</th>
          </tr>
        </thead>
        <tbody>
          {schedule.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center">
                <i>No appointments found for user</i>
              </td>
            </tr>
          )}
          <tr><td colSpan="4" style={{textAlign: "center", fontSize: "1.5rem"}}>Upcoming</td></tr>
          {schedule.length > 0 &&
            schedule.map((schedule) => {
              let upcoming = compareDates(schedule.Date)
              if (upcoming){
                return (
                  <tr>
                    <td>{moment(schedule.Date).format("YYYY-MM-DD")}</td>
                    <td>{schedule.Timeslot}</td>
                    <td>{schedule.Username}</td>
                    <td>{" "}</td>
                  </tr>
                )
              } else {
                return null
              }             
            })
          }
        </tbody>
      </Table>
      <div>
      <Button color="success" onClick={toggle} style={{ margin: "0 auto 1rem auto", display: "block" }}>Past appointments</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
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
                  <td colSpan="3" className="text-center">
                    <i>No appointments found for user</i>
                  </td>
                </tr>
              )}
              {schedule.length > 0 &&
                schedule.map((schedule) => {
                  let upcoming = compareDates(schedule.Date)
                  if (!upcoming){
                    return (
                      <tr>
                        <td>{moment(schedule.Date).format("YYYY-MM-DD")}</td>
                        <td>{schedule.Timeslot}</td>
                        <td>{schedule.Username}</td>
                      </tr>
                    )
                  } else {
                    return null
                  }             
                })
              }
            </tbody>
          </Table>
          </CardBody>
        </Card>
      </Collapse>
    </div>
      <br/><br/>
    </Container>
  );
};

export default ScheduleList;
