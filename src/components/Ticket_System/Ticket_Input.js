import React, { useState } from 'react'
import { Form, FormGroup, Col, Input, Label, Button, Container} from 'reactstrap'
import Tooltip from '@material-ui/core/Tooltip';

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

const TicketInput = () => {
    const [email, setEmail] = useState("")
    const [Username, setUsername] = useState("")
    const [content, setContent] = useState("")
    const Date =  SQLDateParsed();

    const formSubmit = async event => {
        event.preventDefault()
        const response = await fetch('http://localhost:4000/tickets/entries', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email,Username,content,Date})
        })
        const payload = await response.json()
        if (response.status >= 400) {
            alert(`woops! Error: ${payload.message} for fields: ${payload.invalid.join(",")}`)
        } else {
            alert(`Your Ticket has been made`)
            resetForm()
        }
    }
    const resetForm = () => {
        setEmail("")
        setUsername("")
        setContent("")
    }
    return (
        <Container className="container">
          <center>
                <Form className="my-5" onSubmit={formSubmit}>
                <FormGroup row>
                    <Label for="emailEntry" sm={2}>Email</Label>
                    <Col sm={10}>
                    <Tooltip Username="Enter Your Email so we can contact you.">
                    <Input type="email" name="email" id="emailEntry" placeholder="Enter Your Email for records"  required value={email} onChange={e => setEmail(e.target.value) }/>
                    </Tooltip>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="UsernameEntry" sm={2}>Username</Label>
                    <Col sm={10}>
                    <Tooltip Username="Enter The Username Of The ticket Here">
                    <Input type="Username" name="Username" id="UsernameEntry" placeholder="Enter the Username of your ticket" value={Username} onChange={e => setUsername(e.target.value)}/>
                    </Tooltip>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="messageEntry" sm={2}>Message</Label>
                    <Col sm={10}>
                    <Tooltip Username="Fill In The Content Of Your ticket Here">
                    <Input type="textarea" name="text" id="messageEntry" placeholder="Enter Your ticket/Issue here"   required value={content} onChange={e => setContent(e.target.value)}/>
                    </Tooltip>
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                    <center><Button color="warning" >Submit</Button></center>
                    </Col>
                </FormGroup>
            </Form>
          </center>
        </Container>
      )
    }

    
    export default TicketInput