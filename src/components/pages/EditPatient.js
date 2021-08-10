import React, { useState} from "react";
import { useHistory } from "react-router";
import Container from "@material-ui/core/Container";
import Tooltip from '@material-ui/core/Tooltip';
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
import Fade from 'react-reveal/Fade';


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
    PatientID: `${editPatient.PatientID}` //not editable in form. I included this for pushing back to the patient view page with the full updated info. SW
  });
  const [alertContent, setAlertContent] = useState(null)

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:4000/patients/${id}`, {
      method: "PATCH",
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    })
    const payload = await response.json()
    if (response.status === 400) {
      setAlertContent(payload)
    } else {
      saveRevisions()
      let path = `/patient/${patient.PatientID}`
      history.push(path, patient)
    }
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
        <Fade top>
        <Container className="containerCU" fixed>
          <Row>
            <Col>
              <br/>
              <h1>Edit Patient: {patient.First_Name} {patient.Last_Name}</h1>
            </Col>
          </Row>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <br/>
            <p style={{fontStyle: "italic"}}>All fields are required.</p>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>Date of Birth</Label>
                  <Input type="date" name="DOB" id="dob" required 
                    defaultValue={patient.DOB}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>OHIP Number</Label>
                  <Input type="text" name="OHIP" id="ohip" required
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
                  <Tooltip title="Max length 20 characters and cannot include spaces">
                    <Input type="text" name="First_Name" id="firstName" required
                      defaultValue={patient.First_Name}
                      onChange={handleChange}
                    />
                  </Tooltip>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Tooltip title="Max length 20 characters and cannot include spaces">
                    <Input type="text" name="Last_Name" id="lastName" required
                      defaultValue={patient.Last_Name}
                      onChange={handleChange}
                    />
                  </Tooltip>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" name="Email" id="email" required
                    defaultValue={patient.Email}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Tooltip title="Must be a 10-digit number with no dashes, brackets, etc.">
                    <Input type="tel" name="Phone_Number" id="tel" required
                      defaultValue={patient.Phone_Number}
                      onChange={handleChange}
                    />
                  </Tooltip>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label>Address</Label>
              <Input type="text" name="Address" id="address" required
                defaultValue={patient.Address}
                onChange={handleChange}
              />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>City</Label>
                  <Input type="text" name="City" id="city" required
                    defaultValue={patient.City}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>Province</Label>
                  <Input type="text" name="Province" id="province" required
                    defaultValue={patient.Province}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label>Postal Code</Label>
                  <Input type="text" name="PostalCode" id="postalcode" required maxlength="10"
                    defaultValue={patient.PostalCode}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label>Date submitted for Edit:</Label>
                  <Input type="text" name="Last_Edit" id="Last_Edit"
                    disabled = {true}
                    defaultValue={patient.Last_Edit}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div style={{color: "red"}} className={`alert ${!alertContent ? "hidden" : ""}`}>{alertContent}</div>
            <ButtonToggle type="submit" color="primary">Submit</ButtonToggle>
          </Form><br/><br/>
        </Container>
        </Fade>
    </div>
  );
};

export default EditPatient;
