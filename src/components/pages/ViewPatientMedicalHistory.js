import React from "react";
import { Container, Row, Col} from "reactstrap";
import { Card, CardContent } from '@material-ui/core';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
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
                <div style={{display: "flex", justifyContent: "space-between"}}>
                        <h2>Medical History:</h2>
                    </div>
                    <Container>
                        <Row>
                            <Col>
                                <p><span style={{color: "grey"}}>Fever:</span> {MedicalHistory.Fever}</p>
                                <p><span style={{color: "grey"}}>Allergies:</span> {MedicalHistory.Allergies}</p>
                                <p><span style={{color: "grey"}}>Covid Check:</span> {MedicalHistory.Covid_Checked}</p>
                                <p><span style={{color: "grey"}}>Prescriptions:</span> {MedicalHistory.Prescriptions}</p>
                            </Col>
                            <Col>
                                <p><span style={{color: "grey"}}>Insured Status:</span> {MedicalHistory.InsuredStatus}</p>
                                <p><span style={{color: "grey"}}>Insurance Provider:</span> {MedicalHistory.Insurance_Provider}</p>
                                <p><span style={{color: "grey"}}>Imunizations:</span> {MedicalHistory.Imunizations}</p>
                                <p><span style={{color: "grey"}}>BillStatus:</span> {MedicalHistory.BillStatus}</p>
                            </Col>
                            <Col>
                                <p><span style={{color: "grey"}}>Smoker:</span> {MedicalHistory.Smoker}</p>
                                <p><span style={{color: "grey"}}>Chronic Pain:</span> {MedicalHistory.Chronic_Pain}</p>
                                <p><span style={{color: "grey"}}>Past Procedures:</span> {MedicalHistory.Past_Procedures}</p>
                                <p><span style={{color: "grey"}}>Weight:</span> {MedicalHistory.Weight}</p>
                            </Col>
                        </Row>
                                <p><span style={{color: "grey"}}><i><b>Last Edit:</b></i></span> {moment(MedicalHistory.Date).format("YYYY-MM-DD")}</p>
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
                    </Container>
                </CardContent>
            </Card>
        </div>
    )
}

export default ViewMedicalHistoryMedicalHistory