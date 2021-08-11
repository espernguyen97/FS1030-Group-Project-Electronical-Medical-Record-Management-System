import React, { useEffect, useState } from "react";
import { parseJwt } from "../helpers/authHelper";
import { Container } from "reactstrap";
import { Table, Row } from "reactstrap";
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = () => {
  const classes = useStyles();
  const token = sessionStorage.getItem("token");
  const [query, setQuery] = useState();
  const [appointments, setappointment] = useState([]);
  const appointment = parseJwt(token).appointmentname;

  const getData = async () => {
    const response = await fetch("http://localhost:4000/schedule/", {
      method: "GET",
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setappointment(data);
  };
  // eslint-disable-next-line
  useEffect(() => {getData()}, [token]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setTimeout(() => {
      fetch(`http://localhost:4000/appointmentSearch?key=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((appointments) => {
          setappointment(appointments)
        });
    }, 100);
  };

  const resetState = () => {
    getData()
    document.getElementById("appointment-searchbar").value = ""
    setQuery(null)
  }

  return (
    <Container>
    <center>
    <Fade>
    <Container className="mainContent">
      <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        onChange={handleSearch}
        className={classes.input}
        id="appointment-searchbar"
        placeholder="Search Appointment Database"
        inputProps={{ 'aria-label': 'Search Appointment Database' }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <RotateLeftIcon type="reset" onClick={resetState} />
      </IconButton>
    </Paper>
    <br/><br/>
      {query && <p>Results for: {query}</p>}
      <Row className="appointmentTitle">
        <h2 className="display-5">
          Total Appointments:{appointments.length}
          {appointment}
        </h2>
      </Row>
      <Table responsive className="content">
        <thead>
          <tr>
            <th>Date</th>
            <th>Caregiver</th>
            <th>PatientID</th>
             <th>Time Slot</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                <i>No appointments found</i>
              </td>
            </tr>
          )}
          {appointments.length > 0 &&
            appointments.map((appointment) => (
              <tr>
                <td>{moment(appointment.Date).format("YYYY-MM-DD")}</td>
                        <td>{appointment.Username}</td>
                        <td>{appointment.PatientID}</td>
                        <td>{appointment.Timeslot}</td>
                        <td style={{whiteSpace: "nowrap"}}></td>
                <td>
                  {" "}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
    </Fade>
    </center>
    </Container>
  );
};

export default Search;
