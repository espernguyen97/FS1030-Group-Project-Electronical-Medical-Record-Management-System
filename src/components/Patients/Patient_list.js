import React, { useEffect, useState } from "react";
import parseJwt from "../../helpers/authHelper";
import { Container } from "reactstrap";
import { Table, Button, Row } from "reactstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router";

const PatientList = () => {
  const token = sessionStorage.getItem("token");
  const user = parseJwt(token).username;
  const [patients, setPatients] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:4000/patients/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPatients(data);
    };
    getData();
  }, [token]);

  const patientEditRoute = (event, patient) => {
      event.preventDefault();
      let path = `/patients/${patient.PatientID}`
      history.push(path);
  }

  return (
    <Container className="mainContent">
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
                <td>{patient.DOB}</td>
                <td>{patient.OHIP}</td>
                <td>{patient.Phone_Number}</td>
                <td>{patient.Email}</td>
                <td>{patient.Age}</td>
                <td>
                  {" "}
                  <Button color="primary" onClick={(e) => patientEditRoute(e, patient)}>
                    <EditIcon />
                  </Button>
                  <Button color="danger">
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

export default PatientList;
