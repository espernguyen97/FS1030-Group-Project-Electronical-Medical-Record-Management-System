import React, { useState } from 'react'
import { Form, FormGroup, Col,Button, Container} from 'reactstrap'
import PersonIcon from '@material-ui/icons/Person';
import Input from '@material-ui/core/Input';
import LockIcon from '@material-ui/icons/Lock';
import InputLabel from '@material-ui/core/InputLabel';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Pulse from 'react-reveal/Pulse';
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

const CreateUser = () => {
    const token = sessionStorage.getItem('token')
    const [First_Name, setFirst_Name] = useState("")
    const [Email, setEmail] = useState("")
    const [Job_Position, setJob_Position] = useState("")
    const [Username, setUsername] = useState("")
    const [Admin_Flag, setAdmin_Flag] = useState(false)
    const [Last_Name, setLast_Name] = useState("")
    const [Password, setPassword] = useState("")
    const [alertContent, setAlertContent] = useState(null)
    const Last_Login =  SQLDateParsed();

    const formSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:4000/users', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Username, First_Name, Last_Name, Email, Job_Position, Password, Admin_Flag, Last_Login})
        })
        const payload = await response.json()
        if (response.status >= 400) {
            setAlertContent(`Error with fields: ${payload.invalid(",")}`)
        } else {
            setAlertContent(null)
            Swal.fire({
                icon: 'success',
                titleText: 'Success' ,
                title: 'Success!',
                text: 'A New CareGiver/Admin Has been Created.',
                confirmButtonColor: '#4BB543',
              })
            resetForm()
        }
    }

    const resetForm = () => {
        setFirst_Name("")
        setEmail("")
        setLast_Name("")
        setUsername("")
        setPassword("")
        setAdmin_Flag("")
        setJob_Position("")
    }
   
    return (
        <main>
            <Pulse>
            <Container className="containerCU">
                <center>
                <img className="banner" src="assets/caregiverbanner.png" alt="#" />
                <Form className="my-5" onSubmit={formSubmit}>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">User Name</InputLabel>
                                <PersonIcon/> 
                            <Tooltip title="Enter The User Name Here">
                           <Input  name="Username" id="Username" placeholder="Enter The User Name Here" required value={Username} onChange={e => setUsername(e.target.value)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">First Name</InputLabel>
                                <PersonIcon/> 
                            <Tooltip title="Enter The Doctors Name Here">
                           <Input  name="First_Name" id="First_Name" placeholder="Doctors First Name Here" required value={First_Name} onChange={e => setFirst_Name(e.target.value)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Last Name</InputLabel>
                                <PersonIcon/> 
                            <Tooltip title="Enter The Doctors Name Here">
                           <Input name="Last_Name" id="Last_Name" placeholder="Doctors Last Name Here" required value={Last_Name} onChange={e => setLast_Name(e.target.value)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Email Address</InputLabel>
                                <AlternateEmailIcon/>
                            <Tooltip title="Enter The Email That Will Be Used To Login">
                            <Input type="Email" name="Email" id="EmailEntry" placeholder="This is used to Login"  required value={Email} onChange={e => setEmail(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Job Position</InputLabel>
                                <LocalHospitalIcon/>
                            <Tooltip title="Enter Users Job Position">
                            <Input name="Job_Position" id="Job_Position" placeholder="Enter Users Job Position"  required value={Job_Position} onChange={e => setJob_Position(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
                                <LockIcon/>
                            <Tooltip title="12 Character Minimum">
                            <Input classname="pwfield" type="Password" name="Password" id="Password"  placeholder="12 Character Minimum"   value={Password} onChange={e => setPassword(e.target.value)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Is Admin</InputLabel>
                                <SupervisorAccountIcon/>
                            <Tooltip title="Is this user a Admin?">
                            <Checkbox color="primary" className="Admin_Flag" name="Admin_Flag" id="Admin_Flag" value={Admin_Flag} onChange={e => setAdmin_Flag(e.target.checked)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <div className={`alert ${!alertContent ? "hidden" : ""}`}>{alertContent}</div>
                    <FormGroup check row>
                        <Col>
                            <p style={{fontStyle: "italic"}}>Fill out all fields to create a new Admin</p>
                            <Button color="primary" type="submit">Create New Doctor</Button>
                        </Col>
                    </FormGroup>
                </Form>
          </center>
            </Container>
            </Pulse>
        </main>
    )
}

export default CreateUser