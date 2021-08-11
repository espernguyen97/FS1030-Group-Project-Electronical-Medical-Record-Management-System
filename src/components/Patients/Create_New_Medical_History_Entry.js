import React, { useEffect,useState } from 'react'
import {Input, Form, Col,Row, Button, Container} from 'reactstrap'
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import parseJwt from "../../helpers/authHelper";
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom';
import MultiStep from "react-multistep";



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

const MedicalHistoryCreate = () => {
    const location = useLocation();
    const [PatientID, setPatientID] = useState(location.state.PatientID)
    const token = sessionStorage.getItem('token')
    const [Username, setUsername] = useState(location.state.Username)
    const [Fever, setFever] = useState("")
    const [Allergies, setAllergies] = useState("")
    const [XrayURL, setXrayURL] = useState("")
    const [Covid_Checked, setCovid_Checked] = useState("")
    const [LabResults, setLabResults] = useState("")
    const [Prescriptions, setPrescriptions] = useState("")
    const [InsuredStatus, setInsuredStatus] = useState("")
    const [Insurance_Provider, setInsurance_Provider] = useState("")
    const [Immunizations, setImmunizations] = useState("")
    const [BillStatus, setBillStatus] = useState("")
    const [Smoker, setSmoker] = useState("")
    const [Chronic_Pain, setChronic_Pain] = useState("")
    const [Past_Procedures, setPast_Procedures] = useState("")
    const [Weight, setWeight] = useState("")
    const [alertContent, setAlertContent] = useState(null)
    const Date =  SQLDateParsed();
    const user = parseJwt(token).userEmail;// eslint-disable-next-line
    const [patients, setPatients] = useState([]);
    
  
    useEffect(() => {
      const getData = async () => {
        const response = await fetch("http://localhost:4000/medical_history/", {
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

    useEffect(() => {
        const getData = async () => {
          const response = await fetch(`http://localhost:4000/users/${user}`, {
            method: "GET",
            mode: 'cors',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setUsername(data.Username);
        };
        getData();// eslint-disable-next-line
      }, [token]);
    
  
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


    const formSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:4000/medical_history', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Fever, PatientID, Username,Date, Allergies, XrayURL, Covid_Checked, Prescriptions, LabResults, BillStatus, Insurance_Provider, InsuredStatus, Smoker, Chronic_Pain, Past_Procedures, Weight,Immunizations})
        })
        const payload = await response.json()
        if (response.status >= 400) {
            setAlertContent(`Error with fields: ${payload.invalid.join(",")}`)
        } else {
            setAlertContent(null)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Success!',
                titleText: 'Success' ,
                text: 'A New Medical Entry Has been Created.',
                confirmButtonColor: '#4BB543',
                timer: 1500
              })
            resetForm()
        }
    }

    const resetForm = () => {
        setPatientID("")
        setUsername("")
        setFever("")
        setAllergies("")
        setXrayURL("")
        setCovid_Checked("")
        setLabResults("")
        setPrescriptions("")
        setInsuredStatus("")
        setInsurance_Provider("")
        setImmunizations("")
        setBillStatus("")
        setSmoker("")
        setChronic_Pain("")
        setPast_Procedures("")
        setWeight("")
    }
    const steps = [
        { name: "Billing", component: 
        <React.Fragment>
                    <Row>
                        <Col>
                           <InputLabel><b>Billing Status</b></InputLabel>
                            <Tooltip title="Select if the patient has Paid Invoice">
                            <Input type="select" name="BillStatus" id="BillStatus" placeholder="Select Your BillStatus" value={BillStatus} onChange={e => setBillStatus(e.target.value) }>
                            <option></option>
                            <option>Paid</option>
                            <option>OutStanding</option>
                            </Input>
                            </Tooltip>
                        </Col> 
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                           <InputLabel><b>Insurance Provider</b></InputLabel>
                            <Tooltip title="Enter The Patients Insurance Provider">
                            <Input type="text" name="Insurance_Provider" id="Insurance_Provider" placeholder="Enter the Name of The Insurance Company"  value={Insurance_Provider} onChange={e => setInsurance_Provider(e.target.value) }/>
                            </Tooltip>
                        </Col>
                        <Col>
                           <InputLabel><b>Insured Status</b></InputLabel>
                            <Tooltip title="Select Insured Status of the Patient">
                            <Input type="select" name="InsuredStatus" id="InsuredStatus" placeholder="Select Your Insured Status "  value={InsuredStatus} onChange={e => setInsuredStatus(e.target.value) }>
                            <option></option>
                            <option>Insured</option>
                            <option>Not Insured</option>
                            </Input>
                            </Tooltip>
                        </Col>
                    </Row>
                    <br/>
        </React.Fragment>
                    },
        { name: "Health Checkup", component: 
        <React.Fragment>
                <Row>
                    <Col>
                    <InputLabel><b>Covid Check</b></InputLabel>
                        <Tooltip title="Was This Patient Screened for Covid?">
                        <Input type="select" name="Covid_Checked" id="Covid_Checked" placeholder="Yes Or No"   value={Covid_Checked} onChange={e => setCovid_Checked(e.target.value) }>
                        <option></option>
                        <option>Yes</option>
                        <option>No</option>
                        </Input>
                        </Tooltip>
                    </Col>
                    <Col>
                    <InputLabel><b>Fever</b></InputLabel>
                        <Tooltip title="Select if the patient has signs of a fever">
                        <Input type="select" name="Fever" id="Fever" placeholder="Select Your Username"   value={Fever} onChange={e => setFever(e.target.value) }>
                        <option></option>
                        <option>Yes</option>
                        <option>No</option>
                        </Input>
                        </Tooltip>
                    </Col>
                    <Col>
                    <InputLabel><b>Smoker</b></InputLabel>
                        <Tooltip title="Select if the patient is a Smoker">
                        <Input type="select" name="Smoker" id="Smoker" placeholder="Select Your Smoker Status"   value={Smoker} onChange={e => setSmoker(e.target.value) }>
                        <option></option>
                        <option>Yes</option>
                        <option>No</option>
                        </Input>
                        </Tooltip>
                    </Col>
                    <Col>
                    <InputLabel><b>Chronic Pain</b></InputLabel>
                        <Tooltip title="Select if the Paitient has Chronic Pain">
                        <Input type="select" name="Chronic_Pain" id="Chronic_Pain" placeholder="Select Your Chronic Pain Status "   value={Chronic_Pain} onChange={e => setChronic_Pain(e.target.value) }>
                        <option></option>
                        <option>Yes</option>
                        <option>No</option>
                        </Input>
                        </Tooltip>
                    </Col>
                </Row>
                    <br/>
                    <Row>
                        <Col>
                           <InputLabel><b>Weight</b></InputLabel>
                            <Tooltip title="Enter The Note For the Patient">
                            <Input type="text" name="Weight" id="Weight" placeholder="Enter Patient Weight"   value={Weight} onChange={e => setWeight(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </Row>
                    <br/>
        </React.Fragment>
                 },
        { name: "Records", component: 
        <React.Fragment>
            <br/>
                <Row>
                    <Col>
                    <InputLabel><b>Allergies</b></InputLabel>
                        <Tooltip title="Enter The Allergies For the Patient">
                        <Input type="textarea" name="Allergies" id="Allergies" placeholder="Allergy 1, Allergy 2, ..."   value={Allergies} onChange={e => setAllergies(e.target.value) }/>
                        </Tooltip>
                    </Col>
                </Row>
                    <br/>
                <Row>
                    <Col>
                    <InputLabel><b>Prescriptions</b></InputLabel>
                        <Tooltip title="Enter The Prescriptions For the Patient">
                        <Input type="textarea" name="Prescriptions" id="Prescriptions" placeholder="Prescription 1, Prescription 2 ... "  value={Prescriptions} onChange={e => setPrescriptions(e.target.value) }/>
                        </Tooltip>
                    </Col>
                </Row>
                    <br/>
                <Row>
                    <Col>
                    <InputLabel><b>Immunizations</b></InputLabel>
                        <Tooltip title="Enter The Immunizations For the Patient">
                        <Input type="textarea" name="Immunizations" id="Immunizations" placeholder="Immunization 1, Immunization 2 ... "  value={Immunizations} onChange={e => setImmunizations(e.target.value) }/>
                        </Tooltip>
                    </Col>
                </Row>
                    <br/>
                <Row>
                    <Col>
                    <InputLabel><b>Past Procedures</b></InputLabel>
                        <Tooltip title="Enter The Note For the Patient">
                        <Input type="textarea" name="Past_Procedures" id="Past_Procedures" placeholder="Procedure 1,Procedure 2 ..."   value={Past_Procedures} onChange={e => setPast_Procedures(e.target.value) }/>
                        </Tooltip>
                    </Col>
                </Row>
                <br/>
         </React.Fragment>
                },
        { name: "Agreement", component: 
        <React.Fragment>
            <Row>
                <Col>
                <InputLabel><b>Xray URL</b></InputLabel>
                    <Tooltip title="Enter The Xray URL For the Patient">
                    <Input type="text" name="XrayURL" id="XrayURL" placeholder="Enter Xray URL "   value={XrayURL} onChange={e => setXrayURL(e.target.value) }/>
                    </Tooltip>
                </Col>
                <Col>
                <InputLabel><b>Lab Results URL</b></InputLabel>
                    <Tooltip title="Enter The Lab Results URL For the Patient">
                    <Input type="text" name="LabResults" id="LabResults" placeholder="Enter Lab Results URL "   value={LabResults} onChange={e => setLabResults(e.target.value) }/>
                    </Tooltip>
                </Col>
            </Row>
            <br/>
        </React.Fragment>
    }
      ];
    return (
        
        <main>
            <Container className="containerPatient_Create">
            <div className="App">
                <center>
                <h2>New Medical History Entry</h2>
                                <Row>
                                    <Col>
                                    <InputLabel><b>PatientID</b></InputLabel>
                                        <Tooltip title="Enter The Patients  ID Here">
                                    <Input type="PatientID" name="PatientID" id="PatientID" disabled="true"  required value={PatientID}/>
                                        </Tooltip>
                                    </Col>
                                    <Col>
                                    <InputLabel><b>Username</b></InputLabel>
                                        <Tooltip title="Select Your Username">
                                        <Input type="text" name="Username" id="Username"  disabled="true" required value={Username}>
                                        </Input>
                                        </Tooltip>
                                    </Col>
                                </Row> 
                                <br/>
                <MultiStep steps={steps} />
                <Form className="my-5" onSubmit={formSubmit}>
                    <div className={`alert ${!alertContent ? "hidden" : ""}`}>{alertContent}</div>
                        <Col>
                            <p style={{fontStyle: "italic"}}>Fill out the fields you require then submit</p>
                            <Button color="primary" type="submit"><NoteAddIcon/>Add Medical History Entry</Button>
                        </Col>
                </Form>
          </center>
          </div>
            </Container>
        </main>
    )
}

export default MedicalHistoryCreate