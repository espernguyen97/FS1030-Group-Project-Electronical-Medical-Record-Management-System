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


const CU = () => {
    const token = sessionStorage.getItem('token')
    const [firstName, setfirstName] = useState("")
    const [email, setEmail] = useState("")
    const [jobPosition, setjobPosition] = useState("")
    const [username, setusername] = useState("")
    const [Admin_Flag, setAdmin_Flag] = useState("")
    const [lastName, setlastName] = useState("")
    const [password, setPassword] = useState("")
    const [alertContent, setAlertContent] = useState(null)
    const Ddate =  new Date();

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
            body: JSON.stringify({username,firstName,lastName, email,jobPosition, password,Admin_Flag,Ddate})
        })
        const payload = await response.json()
        if (response.status >= 400) {
            setAlertContent(`Error with fields: ${payload.invalid.join(",")}`)
        } else {
            setAlertContent(null)
            alert(`Care Giver Was Created!`)
            resetForm()
        }
    }

    const resetForm = () => {
        setfirstName("")
        setEmail("")
        setlastName("")
        setusername("")
        setPassword("")
        setAdmin_Flag("")
        setjobPosition("")
    }
   
    return (
        <main>
            <Container className="containerCU">
                <center>
                <h2>New Care Giver</h2>
                <Form className="my-5" onSubmit={formSubmit}>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">User Name</InputLabel>
                                <PersonIcon/> 
                            <Tooltip title="Enter The User Name Here">
                           <Input  name="username" id="username" placeholder="Enter The User Name Here" required value={username} onChange={e => setusername(e.target.value)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">First Name</InputLabel>
                                <PersonIcon/> 
                            <Tooltip title="Enter The Doctors Name Here">
                           <Input  name="firstName" id="firstName" placeholder="Doctors First Name Here" required value={firstName} onChange={e => setfirstName(e.target.value)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Last Name</InputLabel>
                                <PersonIcon/> 
                            <Tooltip title="Enter The Doctors Name Here">
                           <Input name="lastName" id="lastName" placeholder="Doctors Last Name Here" required value={lastName} onChange={e => setlastName(e.target.value)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Email Address</InputLabel>
                                <AlternateEmailIcon/>
                            <Tooltip title="Enter The Email That Will Be Used To Login">
                            <Input type="email" name="email" id="emailEntry" placeholder="This is used to Login"  required value={email} onChange={e => setEmail(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Job Position</InputLabel>
                                <LocalHospitalIcon/>
                            <Tooltip title="Enter Users Job Position">
                            <Input name="jobPosition" id="jobPosition" placeholder="Enter Users Job Position"  required value={jobPosition} onChange={e => setjobPosition(e.target.value) }/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
                                <LockIcon/>
                            <Tooltip title="12 Character Minimum">
                            <Input classname="pwfield" type="password" name="password" id="passwordEntry"  placeholder="12 Character Minimum"   value={password} onChange={e => setPassword(e.target.value)}/>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    {/*Admin flag is not registering full I belive we need to set a state for it when it is clicked and not and push that somehow getting Tired lol- Dave*/}
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
                            <Button color="warning" type="submit">Create New Doctor</Button>
                        </Col>
                    </FormGroup>
                </Form>
          </center>
            </Container>
        </main>
    )
}

export default CU