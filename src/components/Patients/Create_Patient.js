import React, { useState } from 'react'
import { Form, FormGroup, Col,Button, Container} from 'reactstrap'
import PersonIcon from '@material-ui/icons/Person';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import CakeIcon from '@material-ui/icons/Cake';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import UpdateIcon from '@material-ui/icons/Update';





const PatientCreate = () => {
    const token = sessionStorage.getItem('token')
    const [name, setName] = useState("")
    const [Last_Name, setLast_Name] = useState("")
    const [DOB, setDOB] = useState("")
    const [OHIP, setOHIP] = useState("")
    const [Address, setAddress] = useState("")
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
            body: JSON.stringify({name, Last_Name, DOB,OHIP,Address,Phone_Number,email,Age,Ddate})
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
        setPhone_Number("")
        setEmail("")
        setAge("")
    }

    return (
        <main>
            <Container className="containerPatient_Create">
                <center>
                <h2>New Patient</h2>
                <Form className="my-5" onSubmit={formSubmit}>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">First Name</InputLabel>
                                <PersonIcon/> 
                            <Tooltip title="Enter The Patients First Name Here">
                           <Input type="name" name="name" id="nameEntry" placeholder="First Name Here" required value={name} onChange={e => setName(e.target.value)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Last Name</InputLabel>
                                <PersonIcon/>
                            <Tooltip title="Enter The Patients First Name Here">
                            <Input type="Last_Name" name="Last_Name" id="Last_Name" placeholder="Last Name Here"  required value={Last_Name} onChange={e => setLast_Name(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Date Of Birth</InputLabel>
                                <CakeIcon/>
                            <Tooltip title="Enter The Patients Date Of Birth Here">
                            <Input classname="pwfield" type="date" name="DOB" id="DOBEntry"  placeholder="DOB"   value={DOB} onChange={e => setDOB(e.target.value)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">O.H.I.P Number</InputLabel>
                                <CreditCardIcon/>
                            <Tooltip title="Enter The Patients Health Card Number">
                            <Input name="OHIP" id="OHIP" placeholder="OHIP Here"  required value={OHIP} onChange={e => setOHIP(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Address</InputLabel>
                                <HomeIcon/>
                            <Tooltip title="Enter The Patients Address">
                            <Input name="Address" id="Address" placeholder=" Address Here"  required value={Address} onChange={e => setAddress(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Phone Number</InputLabel>
                                <PhoneIcon/>
                            <Tooltip title="Enter The Patients Address">
                            <Input name="Phone_Number" id="Phone_Number" placeholder=" Phone Number Here"  required value={Phone_Number} onChange={e => setPhone_Number(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Email Address</InputLabel>
                                <AlternateEmailIcon/>
                            <Tooltip title="Enter the Patient Contact Email">
                            <Input type="email" name="email" id="emailEntry" placeholder="Patient Email"  required value={email} onChange={e => setEmail(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Age</InputLabel>
                                <UpdateIcon/>
                            <Tooltip title="Enter the Patients Age">
                            <Input type="Age" name="Age" id="Age" placeholder="Patient Age"  required value={Age} onChange={e => setAge(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
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