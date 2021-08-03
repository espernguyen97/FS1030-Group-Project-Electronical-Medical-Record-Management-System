import React, { useState, useEffect} from "react";
import { useHistory } from "react-router";
import Container from "@material-ui/core/Container";
import moment from "moment";
import {
  Form,
  ButtonToggle,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Pulse from 'react-reveal/Pulse';
import PatientTab from "../Patients/Edit_Patient_Tab";


const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";


const SQLDateParsed = () => {
  // MySQL formatted UTC 
  let d = new Date()
  let SQLDate = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    (d.getMinutes()), 
    d.getSeconds(),
    d.getMilliseconds()
  ).toISOString().slice(0, 19).replace('T', ' ')
  return(SQLDate)
}

const EditPatient = (props) => {
  let id = props.match.params.id;
  let editPatient = props.location.state;
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const [patient, setPatient] = useState({
    DOB: `${moment(editPatient.DOB).format("YYYY-MM-DD")}`,
    OHIP: `${editPatient.OHIP}`,
    First_Name: `${editPatient.First_Name}`,
    Last_Name: `${editPatient.Last_Name}`,
    Email: `${editPatient.Email}`,
    Address: `${editPatient.Address}`,
    City: `${editPatient.City}`,
    Province: `${editPatient.Province}`,
    PostalCode: `${editPatient.PostalCode}`,
    Phone_Number: `${editPatient.Phone_Number}`,
    Last_Edit: `${SQLDateParsed()}`,
  });

  const saveRevisions = () => {
    let PatientID = props.match.params.id
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    let UserID = currentUser.UserID
    let Editor = `${currentUser.First_Name} ${currentUser.Last_Name}`
    let Revisions = []
    for (let key in patient) {
      if (key !== "Last_Edit" && patient[key] !== editPatient[key]) {
        Revisions.push(`${key} changed from ${editPatient[key]} to ${patient[key]} by ${Editor}`)
      }
    }
    if (Revisions.length) {
      fetch('http://localhost:4000/patient-revisions', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({UserID, PatientID, Revisions})
      }).then((response) => response.json());
    }
  }
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);

  const getPerson = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { large: image } = person.picture;

    const newPerson = {
      image,
    };
    setPerson(newPerson);
    setLoading(false);
  };

  useEffect(() => {
    getPerson();
  }, []);



  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/patients/${id}`, {
      method: "PATCH",
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    }).then((response) => response.json());
    saveRevisions()
    history.push("/Patients");
  };

  const handleChange = (event) => {
    event.persist();
    setPatient((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="main-panel">
    <br/>
      <br/>
        <Pulse>
        <Container className="containerCU" fixed>
          <Row>
            <Col>
                <h1>Edit Patient: {patient.First_Name} {patient.Last_Name}</h1>
            </Col>
            <Col>
              <img
                src={(person && person.image) || defaultImage}
                alt="random user"
                className="patient-img"
              />
            </Col>
          </Row>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    name="DOB"
                    id="dob"
                    defaultValue={patient.DOB}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>OHIP Number</Label>
                  <Input
                    type="text"
                    name="OHIP"
                    id="ohip"
                    defaultValue={patient.OHIP}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="First_Name"
                    id="firstName"
                    defaultValue={patient.First_Name}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="Last_Name"
                    id="lastName"
                    defaultValue={patient.Last_Name}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="Email"
                    id="email"
                    defaultValue={patient.Email}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    name="Phone_Number"
                    id="tel"
                    defaultValue={patient.Phone_Number}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label>Address</Label>
              <Input
                type="text"
                name="Address"
                id="address"
                defaultValue={patient.Address}
                onChange={handleChange}
              />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>City</Label>
                  <Input
                    type="text"
                    name="City"
                    id="city"
                    defaultValue={patient.City}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>Province</Label>
                  <Input
                    type="text"
                    name="Province"
                    id="province"
                    defaultValue={patient.Province}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label>Postal Code</Label>
                  <Input
                    type="text"
                    name="PostalCode"
                    id="postalcode"
                    defaultValue={patient.PostalCode}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label>Date submitted for Edit:</Label>
                  <Input
                    type="text"
                    name="Last_Edit"
                    id="Last_Edit"
                    disabled = {true}
                    defaultValue={patient.Last_Edit}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <ButtonToggle type="submit" color="primary">Submit</ButtonToggle>
          </Form><br/><br/>
          <PatientTab/>
        </Container>
        </Pulse>
    </div>
  );
};

export default EditPatient;
