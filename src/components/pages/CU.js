import React, { useState } from 'react'
import { Form, FormGroup, Col,Button, Container} from 'reactstrap'
import PersonIcon from '@material-ui/icons/Person';
import Input from '@material-ui/core/Input';
import LockIcon from '@material-ui/icons/Lock';
import InputLabel from '@material-ui/core/InputLabel';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Tooltip from '@material-ui/core/Tooltip';


const CU = () => {
    const token = sessionStorage.getItem('token')
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
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
            body: JSON.stringify({name, email, password,Ddate})
        })
        const payload = await response.json()
        if (response.status >= 400) {
            setAlertContent(`Error with fields: ${payload.invalid.join(",")}`)
        } else {
            setAlertContent(null)
            alert(`Doctor Was Created!`)
            resetForm()
        }
    }

    const resetForm = () => {
        setName("")
        setEmail("")
        setPassword("")
    }

    return (
        <main>
            <Container className="containerCU">
                <center>
                <h2>New Care Giver</h2>
                <Form className="my-5" onSubmit={formSubmit}>
                    <FormGroup row>
                        <Col sm={10}>
                           <InputLabel htmlFor="input-with-icon-adornment">Doctors Name</InputLabel>
                                <PersonIcon/> 
                            <Tooltip title="Enter The Doctors Name Here">
                           <Input type="name" name="name" id="nameEntry" placeholder="Doctors Name Here" required value={name} onChange={e => setName(e.target.value)}/>
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
                           <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
                                <LockIcon/>
                            <Tooltip title="Enter The Password That Will Be Used To Login">
                            <Input classname="pwfield" type="password" name="password" id="passwordEntry"  placeholder="12 Character Minimum"   value={password} onChange={e => setPassword(e.target.value)}/>
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