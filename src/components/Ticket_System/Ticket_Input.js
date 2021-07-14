import React, { useState } from 'react'
import { Form, FormGroup, Col, Input, Label, Button, Container} from 'reactstrap'
import Tooltip from '@material-ui/core/Tooltip';

const TicketInput = () => {
    const [email, setEmail] = useState("")
    const [Title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const Ddate =  new Date();

    const formSubmit = async event => {
        event.preventDefault()
        const response = await fetch('http://localhost:4000/tickets/entries', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email,Title,content,Ddate})
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
        setTitle("")
        setContent("")
    }
    return (
        <Container className="container">
          <center>
                <Form className="my-5" onSubmit={formSubmit}>
                <FormGroup row>
                    <Label for="emailEntry" sm={2}>Email</Label>
                    <Col sm={10}>
                    <Tooltip title="Enter Your Email so we can contact you.">
                    <Input type="email" name="email" id="emailEntry" placeholder="Enter Your Email for records"  required value={email} onChange={e => setEmail(e.target.value) }/>
                    </Tooltip>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="TitleEntry" sm={2}>Title</Label>
                    <Col sm={10}>
                    <Tooltip title="Enter The Title Of The ticket Here">
                    <Input type="Title" name="Title" id="TitleEntry" placeholder="Enter the Title of your ticket" value={Title} onChange={e => setTitle(e.target.value)}/>
                    </Tooltip>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="messageEntry" sm={2}>Message</Label>
                    <Col sm={10}>
                    <Tooltip title="Fill In The Content Of Your ticket Here">
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