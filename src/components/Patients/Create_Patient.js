import React, { useState } from 'react'
import {Input, Form, FormGroup, Col,Row, Button, Container} from 'reactstrap'
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const PatientCreate = () => {
    const token = sessionStorage.getItem('token')
    const [name, setName] = useState("")
    const [Last_Name, setLast_Name] = useState("")
    const [DOB, setDOB] = useState("")
    const [OHIP, setOHIP] = useState("")
    const [Address, setAddress] = useState("")
    const [City, setCity] = useState("")
    const [Province, setProvince] = useState("")
    const [Postal, setPostal] = useState("")
    const [Phone_Number, setPhone_Number] = useState("")
    const [email, setEmail] = useState("")
    const [Age, setAge] = useState("")
    const [alertContent, setAlertContent] = useState(null)
    const Ddate =  new Date();

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
            body: JSON.stringify({name, Last_Name, DOB,OHIP,Address,City,Province,Postal,Phone_Number,email,Age,Ddate})
        })
        const payload = await response.json()
        if (response.status >= 400) {
            setAlertContent(`Error with fields: ${payload.invalid.join(",")}`)
        } else {
            setAlertContent(null)
            alert(`Patient Was Created!`)
            resetForm()
        }
    }

    const resetForm = () => {
        setName("")
        setLast_Name("")
        setDOB("")
        setOHIP("")
        setAddress("")
        setCity("")
        setProvince("")
        setPostal("")
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
                           <Input type="name" name="name" id="nameEntry" placeholder="First Name Here" required value={name} onChange={e => setName(e.target.value)}/>
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
                            <Input type="Postal"  name="Postal" id="Postal" placeholder=" Postal Code Here"  required value={Postal} onChange={e => setPostal(e.target.value) }/>
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
                            <Input type="email" name="email" id="emailEntry" placeholder="Patient Email"  required value={email} onChange={e => setEmail(e.target.value) }/>
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
                            <Button color="warning" type="submit"><PersonAddIcon/>Create Patient</Button>
                        </Col>
                    </FormGroup>
                </Form>
          </center>
            </Container>
        </main>
    )
}

export default PatientCreate