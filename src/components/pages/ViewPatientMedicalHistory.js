import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Card, CardContent } from '@material-ui/core';
import moment from "moment";
import CreateNewMedicalHistoryModal from '../Patients/Create_New_Medical_History_Modal';import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


const ViewMedicalHistoryMedicalHistory = (props) => {
  const classes = useStyles();
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
                                <p><span style={{color: "grey"}}>Prescreptions:</span> {MedicalHistory.Prescriptions}</p>
                            </Col>
                        </Row>
                            <br/>
                            <Col>
                                <div className={classes.root}>
                                <Accordion>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography className={classes.heading}>Xrays</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <Typography>
                                <p><img class="xray" alt="Xray" src={MedicalHistory.XrayURL}></img></p>
                                    </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                    >
                                    <Typography className={classes.heading}>Lab Results</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <Typography>
                                <p><img class="LabResults" alt="LabResults" src={MedicalHistory.LabResults}></img></p>
                                    </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                </div>
                            </Col>
                            <br/>
                            <br/>
                        <center><CreateNewMedicalHistoryModal/></center>
                    </Container>
                </CardContent>
            </Card>
        </div>
    )
}

export default ViewMedicalHistoryMedicalHistory