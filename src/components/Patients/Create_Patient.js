import React, { useState } from 'react'
import {Input, Form, FormGroup, Col,Row, Button, Container} from 'reactstrap'
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
    const [First_Name, setFirst_Name] = useState("")
    const [Last_Name, setLast_Name] = useState("")
    const [DOB, setDOB] = useState("")
    const [OHIP, setOHIP] = useState("")
    const [Address, setAddress] = useState("")
    const [City, setCity] = useState("")
    const [Province, setProvince] = useState("")
    const [PostalCode, setPostalCode] = useState("")
    const [Phone_Number, setPhone_Number] = useState("")
    const [Email, setEmail] = useState("")
    const [Age, setAge] = useState("")
    const [alertContent, setAlertContent] = useState(null)
    const Last_edit =  SQLDateParsed();


    const formSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:4000/patients', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({First_Name, Last_Name, DOB,OHIP,Address,City,Province,PostalCode,Phone_Number,Email,Age,Last_edit})
        })
        const payload = await response.json()
        if (response.status >= 400) {
            setAlertContent(`Error with fields: ${payload.invalid.join(",")}`)
        } else {
            setAlertContent(null)
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                titleText: 'Success' ,
                text: 'A New Patient Has been Created.',
                confirmButtonColor: '#4BB543',
              })
            resetForm()
        }
    }

    const resetForm = () => {
        setFirst_Name("")
        setLast_Name("")
        setDOB("")
        setOHIP("")
        setAddress("")
        setCity("")
        setProvince("")
        setPostalCode("")
        setPhone_Number("")
        setEmail("")
        setAge("")
    }
  //*I tried to move the first last name together etc but the icons did not fit nicley so i removed em for now still not 100% happy with the layout if sombody wants to take a crack at it.- Dave
    return (
        <main>
            <Container className="containerPatient_Create">
                <center>
                <h2>New Patient</h2>
                <img className="banner" src="assets/NewPatient.png" alt="#" />
                <Form className="my-5" onSubmit={formSubmit}>
                <Row>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>First Name</b></InputLabel>
                            <Tooltip title="Enter The Patients First Name Here">
                           <Input type="First_Name" name="First_Name" id="First_Name" placeholder="First Name Here" required value={First_Name} onChange={e => setFirst_Name(e.target.value)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Last Name</b></InputLabel>
                            <Tooltip title="Enter The Patients First Name Here">
                            <Input type="Last_Name" name="Last_Name" id="Last_Name" placeholder="Last Name Here"  required value={Last_Name} onChange={e => setLast_Name(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Date Of Birth</b></InputLabel>
                            <Tooltip title="Enter The Patients Date Of Birth Here">
                            <Input type="date" name="DOB" id="DOBEntry"  placeholder="DOB"   value={DOB} onChange={e => setDOB(e.target.value)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>O.H.I.P Number</b></InputLabel>
                            <Tooltip title="Enter The Patients Health Card Number">
                            <Input type="OHIP" name="OHIP" id="OHIP" placeholder="OHIP Here"  required value={OHIP} onChange={e => setOHIP(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Street Address</b></InputLabel>
                            <Tooltip title="Enter The Patients Address">
                            <Input type="Address"  name="Address" id="Address" placeholder=" Address Here"  required value={Address} onChange={e => setAddress(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>City</b></InputLabel>
                            <Tooltip title="Enter The Patients City">
                            <Input type="City"  name="City" id="City" placeholder=" City Here"  required value={City} onChange={e => setCity(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Province</b></InputLabel>
                            <Tooltip title="Enter The Patients Province">
                            <Input type="Province"  name="Province" id="Province" placeholder=" Province Here"  required value={Province} onChange={e => setProvince(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Postal Code</b></InputLabel>
                            <Tooltip title="Enter The Patients Postal Code">
                            <Input type="PostalCode"  name="PostalCode" id="PostalCode" placeholder=" Postal Code Here"  required value={PostalCode} onChange={e => setPostalCode(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Phone Number</b></InputLabel>
                            <Tooltip title="Enter The Patients Phone Number">
                            <Input type="Phone_Number"  name="Phone_Number" id="Phone_Number" placeholder=" Phone Number Here"  required value={Phone_Number} onChange={e => setPhone_Number(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Email Address</b></InputLabel>
                            <Tooltip title="Enter the Patient Contact Email">
                            <Input type="Email" name="Email" id="EmailEntry" placeholder="Patient Email"  required value={Email} onChange={e => setEmail(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Col>
                           <InputLabel><b>Age</b></InputLabel>
                            <Tooltip title="Enter the Patients Age">
                            <Input type="Age" name="Age" id="Age" placeholder="Patient Age"  required value={Age} onChange={e => setAge(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                </Row>
                    <div className={`alert ${!alertContent ? "hidden" : ""}`}>{alertContent}</div>
                    <FormGroup check row>
                        <Col>
                            <p style={{fontStyle: "italic"}}>Fill out all fields to create a Patient</p>
                            <Button color="primary" type="submit"><PersonAddIcon/>Create Patient</Button>
                        </Col>
                    </FormGroup>
                </Form>
          </center>
            </Container>
        </main>
    )
}

export default PatientCreate