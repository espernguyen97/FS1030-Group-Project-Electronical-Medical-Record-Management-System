import React, { useState } from 'react'
import {Input, Form, FormGroup, Col, Button, Container} from 'reactstrap'
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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

const PatientCreate = () => {
    const token = sessionStorage.getItem('token')
    const [PatientID, setPatientID] = useState("")
    const [Username, setUsername] = useState("")
    const [Note, setNote] = useState("")
    const [alertContent, setAlertContent] = useState(null)
    const Date =  SQLDateParsed();


    const formSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:4000/notes', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Note, PatientID, Username,Date})
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
                text: 'A New Note Has been Created.',
                confirmButtonColor: '#4BB543',
                timer: 1500
              })
            resetForm()
        }
    }

    const resetForm = () => {
        setPatientID("")
        setUsername("")
        setNote("")
    }
  //*I tried to move the first last name together etc but the icons did not fit nicley so i removed em for now still not 100% happy with the layout if sombody wants to take a crack at it.- Dave
    return (
        <main>
            <Container className="containerPatient_Create">
                <center>
                <h2>Add Patient Note</h2>
                <Form className="my-5" onSubmit={formSubmit}>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>PatientID</b></InputLabel>
                            <Tooltip title="Enter The Patients First Name Here">
                           <Input type="PatientID" name="PatientID" id="PatientID" placeholder="First Name Here" required value={PatientID} onChange={e => setPatientID(e.target.value)}/>
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
                           <InputLabel><b>Note</b></InputLabel>
                            <Tooltip title="Enter The Note For the Patient">
                            <Input type="textarea" name="Note" id="Note" placeholder="Note Here"  required value={Note} onChange={e => setNote(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <div className={`alert ${!alertContent ? "hidden" : ""}`}>{alertContent}</div>
                    <FormGroup check row>
                        <Col>
                            <p style={{fontStyle: "italic"}}>Fill out all fields to create a Patient</p>
                            <Button color="primary" type="submit"><PersonAddIcon/>Add Note</Button>
                        </Col>
                    </FormGroup>
                </Form>
          </center>
            </Container>
        </main>
    )
}

export default PatientCreate