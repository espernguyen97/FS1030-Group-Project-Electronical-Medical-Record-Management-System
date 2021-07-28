import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";

const EditPatient = (props) => {
  let id = props.match.params.id;
  const token = sessionStorage.getItem("token");
  const [patient, setPatient] = useState([]);
   

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/patients/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPatient(data);
    };
    fetchData();
    console.log(patient)
  }, [id]);

  return (
    <div className="main-panel">
      {patient.map((patient) => (
        <Container className="my-5" fixed>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>Date of Birth</Label>
                <Input type="text" name="dateofbirth" id="dob" value={patient.DOB}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>OHIP Number</Label>
                <Input type="text" name="ohip" id="ohip" value={patient.OHIP}/>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>First Name</Label>
                <Input type="text" name="firstName" id="firstName" defaultValue={patient.First_Name} onChange={(e) => e.target.value}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Last Name</Label>
                <Input type="text" name="lastName" id="lastName" value={patient.Last_Name}/>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" id="email" value={patient.Email}/>
          </FormGroup>
          <FormGroup>
            <Label>Address</Label>
            <Input type="text" name="address" id="address" value={patient.Address}/>
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>City</Label>
                <Input type="text" name="city" id="city" value={patient.City}/>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Province</Label>
                <Input type="text" name="province" id="province" value={patient.Province}/>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label>Postal Code</Label>
                <Input type="text" name="postalcode" id="postalcode" value={patient.PostalCode}/>
              </FormGroup>
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
};

export default EditPatient;
