import React, { Component, useEffect, useState } from "react";
import { parseJwt } from "../helpers/authHelper";
import { Container } from "reactstrap";
import { Table, Button, Row } from "reactstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PageviewIcon from '@material-ui/icons/Pageview';
import { useHistory } from "react-router";
import moment from "moment";

const Search = () => {
  const token = sessionStorage.getItem("token");
  const [query, setQuery] = useState();
  const [patients, setPatients] = useState([]);
  const user = parseJwt(token).username;
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:4000/patients/", {
        method: "GET",
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPatients(data);
    };
    getData();
  }, [token]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setTimeout(() => {
      fetch(`http://localhost:4000/search?key=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((patients) => {
          setPatients(patients)
        });
    }, 100);
  };

  const resetState = () => {
    window.location.reload();
  }

  const patientViewRoute = (event, patient) => {
    event.preventDefault();
    let path = `/patient/${patient.PatientID}`
    history.push(path, patient);
  }

  const patientDelete = async (event, patient) => {
    event.preventDefault()
    console.log(patient)
    const response = await fetch(`http://localhost:4000/patients/${patient.PatientID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    const data = await response.json();
    console.log(data)
    window.location.reload();
  }

  return (
    <Container className="mainContent">
      <input type="text" name="search" onChange={handleSearch} />
      <button>Search</button>
      <button type="reset" onClick={resetState}>Reset</button>
      {query && <p>Results for: {query}</p>}
      <Row className="userTitle">
        <h2 className="display-5">
          Total Patients:{patients.length}
          {user}
        </h2>
      </Row>
      <Table responsive className="content">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Of Birth</th>
            <th>O.H.I.P Number</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Age</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                <i>No Patients found</i>
              </td>
            </tr>
          )}
          {patients.length > 0 &&
            patients.map((patient) => (
              <tr>
                <td>{patient.First_Name}</td>
                <td>{patient.Last_Name}</td>
                <td>{moment(patient.DOB).format("YYYY-MM-DD")}</td>
                <td>{patient.OHIP}</td>
                <td>{patient.Phone_Number}</td>
                <td>{patient.Email}</td>
                <td>{patient.Age}</td>
                <td>{moment(patient.Last_Edit).format("YYYY-MM-DD")}</td>
                <td>
                  {" "}
                  <Button color="success" onClick={(e) => patientViewRoute(e, patient)}>
                    <PageviewIcon/>
                  </Button>                 
                  {String.fromCharCode(160)}
                  <Button color="danger" onClick={(e) => patientDelete(e, patient)}>
                    <DeleteForeverIcon />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Search;
