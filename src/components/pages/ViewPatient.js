import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Card, CardContent } from '@material-ui/core';

const ViewPatient = (props) => {
    let patient = props.location.state;

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

    return (
        <div className="main-panel">
            <Card>               
                <CardContent>
                    <br/>
                    <h2>Patient: {patient.First_Name} {patient.Last_Name}</h2>
                    <br/>
                    <Container>
                        <Row>
                            <Col>
                                <p><span style={{color: "grey"}}>ID:</span> {patient.PatientID}</p>
                                <p><span style={{color: "grey"}}>OHIP #:</span> {patient.OHIP}</p>
                                <p><span style={{color: "grey"}}>Last edit:</span> {patient.Last_Edit}</p>
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
        </div>
    )
}

export default ViewPatient