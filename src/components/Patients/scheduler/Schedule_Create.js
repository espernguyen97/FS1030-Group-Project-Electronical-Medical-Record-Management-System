import React, { useEffect,useState } from 'react'
import {Input, Form, Col,Row, Button, Container} from 'reactstrap'
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom';


const ScheduleCreate = () => {
    const location = useLocation();
    const [PatientID, setPatientID] = useState(location.state.PatientID)
    const token = sessionStorage.getItem('token')
    const [Username, setUsername] = useState("")
    const [TimeSlot, setTimeSlot] = useState("")
    const [alertContent, setAlertContent] = useState(null)
    const [Date, setDate] = useState("")// eslint-disable-next-line no-unused-vars
    const [patients, setPatients] = useState([]);
  
    useEffect(() => {
      const getData = async () => {
        const response = await fetch("http://localhost:4000/schedule/", {
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
        const response = await fetch('http://localhost:4000/schedule', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({TimeSlot,Date,PatientID,Username})
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
                text: 'A New Appointment Has been Created.',
                confirmButtonColor: '#4BB543',
                timer: 1500
              })
            resetForm()
        }
    }

    const resetForm = () => {
        setPatientID("")
        setUsername("")
        setTimeSlot("")
        setDate("")
    }
    return (
        <main>
            <Container className="containerPatient_Create">
                <center>
                <h2>New Appointment.</h2>
                <Form className="my-5" onSubmit={formSubmit}>
                    <Row>
                        <Col>
                           <InputLabel><b>Date:</b></InputLabel>
                            <Tooltip title="Enter appointment date">
                              <Input type="date" name="Date" id="Date" placeholder="Select Your Date"required value={Date} onChange={e => setDate(e.target.value) }></Input>
                            </Tooltip>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                           <InputLabel><b>TimeSlot</b></InputLabel>
                            <Tooltip title="Enter appointment timeslot">
                              <Input type="time" name="TimeSlot" id="TimeSlot" placeholder="Select Your TimeSlot"  required value={TimeSlot} onChange={e => setTimeSlot(e.target.value) }></Input>
                            </Tooltip>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                           <InputLabel><b>PatientID</b></InputLabel>
                           <Input type="PatientID" name="PatientID" id="PatientID" disabled="true"  value={PatientID}/>
                        </Col>
                        <Col>
                           <InputLabel><b>Docotor For Appointment</b></InputLabel>
                            <Tooltip title="Select The Doctor For This Appointment">
                            <Input type="select" name="Username" id="Username" required value={Username} onChange={e => setUsername(e.target.value) }>
                            <option>John</option>
                            <option>Adrian</option>
                            <option>Alann</option>
                            <option>Alexander</option>
                            <option>Andrew</option>
                            <option>Anthony</option>
                            <option>Austin</option>
                            <option>Benjamin</option>
                            <option>Blake</option>
                            <option>Boris</option>
                            <option>Brandon</option>
                            <option>Brian</option>
                            <option>Cameron</option>
                            <option>Carl</option>
                            <option>Abigail</option>
                            <option>Alexandra</option>
                            <option>Alison</option>
                            <option>Amanda</option>
                            <option>Amelia</option>
                            <option>Amy</option>
                            </Input>
                            </Tooltip>
                        </Col>
                    </Row>
                    <div className={`alert ${!alertContent ? "hidden" : ""}`}>{alertContent}</div>
                        <Col>
                            <p style={{fontStyle: "italic"}}>Fill out all fields to Schedule a new Appointment</p>
                            <Button color="primary" type="submit"><NoteAddIcon/>Add New Appointment</Button>
                        </Col>
                </Form>
          </center>
            </Container>
        </main>
    )
}

export default ScheduleCreate