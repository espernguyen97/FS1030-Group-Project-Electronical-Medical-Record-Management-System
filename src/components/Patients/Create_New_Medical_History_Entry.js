import React, { useEffect,useState } from 'react'
import {Input, Form, FormGroup, Col, Button, Container} from 'reactstrap'
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import parseJwt from "../../helpers/authHelper";
import Swal from 'sweetalert2'



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
    const token = sessionStorage.getItem('token')
    const [PatientID, setPatientID] = useState("")
    const [Username, setUsername] = useState("")
    const [Fever, setFever] = useState("")
    const [Allergies, setAllergies] = useState("")
    const [XrayURL, setXrayURL] = useState("")
    const [Covid_Checked, setCovid_Checked] = useState("")
    const [LabResults, setLabResults] = useState("")
    const [Prescriptions, setPrescriptions] = useState("")
    const [alertContent, setAlertContent] = useState(null)
    const Date =  SQLDateParsed();
    const user = parseJwt(token).username;
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
            body: JSON.stringify({Fever, PatientID, Username,Date, Allergies, XrayURL, Covid_Checked, Prescriptions, LabResults})
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
    }
    return (
        <main>
            <Container className="containerPatient_Create">
                <center>
                <h2>Add New Medical History Entry</h2>
                <Form className="my-5" onSubmit={formSubmit}>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>PatientID</b></InputLabel>
                            <Tooltip title="Enter The Patients First Name Here">
                           <Input type="PatientID" name="PatientID" id="PatientID" placeholder="Enter The Patient ID" required value={PatientID} onChange={e => setPatientID(e.target.value)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Username</b></InputLabel>
                            <Tooltip title="Select Your Username">
                            <Input type="select" name="Username" id="Username" placeholder="Select Your Username"  required value={Username} onChange={e => setUsername(e.target.value) }>
                            <option>testusername</option>
                            <option>Dave</option>
                            <option>Chris</option>
                            <option>Steven</option>
                            </Input>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Fever</b></InputLabel>
                            <Tooltip title="Select if the patient has signs of a fever">
                            <Input type="select" name="Fever" id="Fever" placeholder="Select Your Username"  required value={Fever} onChange={e => setFever(e.target.value) }>
                            <option>Yes</option>
                            <option>No</option>
                            </Input>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Allergies</b></InputLabel>
                            <Tooltip title="Enter The Allergies For the Patient">
                            <Input type="textarea" name="Allergies" id="Allergies" placeholder="Allergy 1, Allergy 2, ..."  required value={Allergies} onChange={e => setAllergies(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>X-ray URL</b></InputLabel>
                            <Tooltip title="Enter The Note For the Patient">
                            <Input type="text" name="XrayURL" id="XrayURL" placeholder="Xray URL goes here Here"  required value={XrayURL} onChange={e => setXrayURL(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Covid Check</b></InputLabel>
                            <Tooltip title="Was This Patient Screened for Covid">
                            <Input type="select" name="Covid_Checked" id="Covid_Checked" placeholder="Yes Or No"  required value={Covid_Checked} onChange={e => setCovid_Checked(e.target.value) }>
                            <option>Yes</option>
                            <option>No</option>
                            </Input>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Lab Results</b></InputLabel>
                            <Tooltip title="Enter The Note For the Patient">
                            <Input type="text" name="LabResults" id="LabResults" placeholder="Lab Results Go here"  required value={LabResults} onChange={e => setLabResults(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Prescriptions</b></InputLabel>
                            <Tooltip title="Enter The Note For the Patient">
                            <Input type="textarea" name="Prescriptions" id="Prescriptions" placeholder="Prescription 1, Prescription 2 ... "  required value={Prescriptions} onChange={e => setPrescriptions(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <div className={`alert ${!alertContent ? "hidden" : ""}`}>{alertContent}</div>
                    <FormGroup check row>
                        <Col>
                            <p style={{fontStyle: "italic"}}>Fill out all fields to add a patient note</p>
                            <Button color="primary" type="submit"><NoteAddIcon/>Add Medical History Entry</Button>
                        </Col>
                    </FormGroup>
                </Form>
          </center>
            </Container>
        </main>
    )
}

export default MedicalHistoryCreate