import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Card, CardContent } from '@material-ui/core';
import moment from "moment";
import CreateNewMedicalHistoryModal from '../Patients/Create_New_Medical_History_Modal';

const ViewMedicalHistoryMedicalHistory = (props) => {
    let MedicalHistory = props.location.state;

    return (
        <div className="main-panel">
            <Card>               
                <CardContent>
                    <br/>
                    <h2>MedicalHistory:</h2>
                    <br/>
                    <Container>
                        <Row>
                            <Col>
                                <p><span style={{color: "grey"}}>Fever:</span> {MedicalHistory.Fever}</p>
                                <p><span style={{color: "grey"}}>Allergies:</span> {MedicalHistory.Allergies}</p>
                                <p><span style={{color: "grey"}}>Covid Check:</span> {MedicalHistory.Covid_Checked}</p>
                                <p><span style={{color: "grey"}}>Last Entry:</span> {moment(MedicalHistory.Date).format("YYYY-MM-DD")}</p>
                            </Col>
                            <Col>
                                <p><span style={{color: "grey"}}>Xray:</span> {MedicalHistory.XrayURL}</p>
                                <p><span style={{color: "grey"}}>Lab Results:</span> {MedicalHistory.LabResults}</p>
                                <p><span style={{color: "grey"}}>Prescreptions:</span> {MedicalHistory.Prescriptions}</p>
                            </Col>
                        </Row>
                        <CreateNewMedicalHistoryModal/>
                    </Container>
                </CardContent>
            </Card>
        </div>
    )
}

export default ViewMedicalHistoryMedicalHistory