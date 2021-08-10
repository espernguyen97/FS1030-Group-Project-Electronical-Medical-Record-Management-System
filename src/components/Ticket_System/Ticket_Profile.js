import React, { useState } from "react";
import { useHistory } from "react-router";
import Container from "@material-ui/core/Container";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  ButtonToggle,
} from "reactstrap";
import moment from "moment";
import Fade from 'react-reveal/Fade';


const SQLDateParsed = new Date().toLocaleString();

const EditTicket = (props) => {
  let id = props.match.params.id;
  let EditTicket = props.location.state;
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const [Ticket, setTicket] = useState({
    Username: `${EditTicket.Username}`,
    email: `${EditTicket.email}`,
    Date: `${moment(SQLDateParsed).format("YYYY-MM-DD")}`,
    content: `${EditTicket.content}`,
    Completed: `${EditTicket.Completed}`,
    Notes: `${EditTicket.Notes}`,
    
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/tickets/entries/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Ticket),
    }).then((response) => response.json());
    history.push("/tickets");
  };

  const handleChange = (event) => {
    event.persist();
    setTicket((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="main-panel">
    <br/>
      <br/>
        <Fade top>
        <Container className="containerCU" fixed> 
        <h3>Ticket From User: {EditTicket.Username}</h3>
            <hr class="yellow"/>
                  <Label>Current Status:</Label>
        <h3><Input type="text" defaultValue={EditTicket.Completed} disabled = {true}/></h3>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>Username:</Label>
                  <Input
                    type="text"
                    name="Username"
                    id="Username"
                    disabled = {true}
                    defaultValue={EditTicket.Username}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>email</Label>
                  <Input
                    type="email"
                    name="Email"
                    id="email"
                    disabled = {true}
                    defaultValue={EditTicket.email}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
                <FormGroup>
                  <Label>Ticket Content</Label>
                  <Input
                    type="textarea"
                    name="content"
                    id="content"
                    disabled = {true}
                    defaultValue={EditTicket.content}
                    onChange={handleChange}
                  />
                </FormGroup>
            <FormGroup>
              <Label>Date</Label>
              <Input
                type="text"
                name="Date"
                id="Date"
                disabled = {true}
                defaultValue={moment(EditTicket.Date).format("YYYY-MM-DD")}
                onChange={handleChange}
              />
            </FormGroup> 
            <br/> 
            <br/>
            <h3>Ticket Progress:</h3>
            <hr class="yellow"/>
            <FormGroup>
              <Label>Completed Status</Label>
              <Input
                type="select"
                name="Completed"
                id="Completed"
                placeholder="Make a selection"
                onChange={handleChange}
              >
              <option>Make a selection</option>
              <option>Action Needed</option>
                <option>Under Review</option>
                <option>In Progress</option>
                <option>Completed</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Notes</Label>
              <Input
                type="textarea"
                name="Notes"
                id="Notes"
                placeholder="Enter your Notes like how you solved this Ticket or where you are at with it."
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Previous Note:</Label>
              <Input
                type="textarea"
                name="Notes"
                id="Notes"
                disabled = {true}
                defaultValue={EditTicket.Notes}
                onChange={handleChange}
              />
            </FormGroup>
            <ButtonToggle type="submit" color="primary">Submit</ButtonToggle>
          </Form>
        </Container>
        </Fade>
    </div>
  );
};

export default EditTicket;
