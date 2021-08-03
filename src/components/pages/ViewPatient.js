import React from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Button } from "reactstrap";
import { Card, CardContent } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import PatientTab from "../Patients/Patient_Tab";

const ViewPatient = (props) => {
    let patient = props.location.state;

    const history = useHistory();

    function getAge() {
        let today = new Date();
        let DOB = patient.DOB;
        let birthDate = new Date(DOB);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const patientEditRoute = (event, patient) => {
        event.preventDefault();
        let path = `/edit-patient/${patient.PatientID}`
        history.push(path, patient);
    }

    return (
        <div className="main-panel">
            <Card>               
                <CardContent>
                    <br/>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <h2>{patient.First_Name} {patient.Last_Name}</h2>
                        <Button color="primary" title="Edit Patient Details" onClick={(e) => patientEditRoute(e, patient)}>
                            <EditIcon />
                        </Button>
                    </div>
                    <br/>
                    <Container>
                        <Row>
                            <Col>
                                <p><span style={{color: "grey"}}>ID:</span> {patient.PatientID}</p>
                                <p><span style={{color: "grey"}}>OHIP #:</span> {patient.OHIP}</p>
                                <p><span style={{color: "grey"}}>Last edit:</span> {moment(patient.Last_Edit).format("YYYY-MM-DD")}</p>
                            </Col>
                            <Col>
                                <p style={{color: "grey", textDecoration: "underline"}}>Contact Details:</p>
                                <p><span style={{color: "grey"}}>Phone:</span> {patient.Phone_Number}</p>
                                <p><span style={{color: "grey"}}>Email:</span> {patient.Email}</p>
                            </Col>
                            <Col>
                                <p><span style={{color: "grey"}}>Date of birth:</span> {patient.DOB.split('T')[0]}</p>
                                <p><span style={{color: "grey"}}>Age:</span> {getAge()}</p>
                                <p><span style={{color: "grey"}}>Full address:</span> {patient.Address}, {patient.City} {patient.Province}, {patient.PostalCode}</p>
                            </Col>
                        </Row>
                    </Container>
                </CardContent>
            </Card>
            <PatientTab/>
        </div>
    )
}

export default ViewPatient