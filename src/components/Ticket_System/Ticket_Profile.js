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
      <h1>Ticket From User: {EditTicket.Username}</h1>
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
            </Row>
            <Row form>
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
              <Col md={6}>
                <FormGroup>
                  <Label>Job Position</Label>
                  <Input
                    type="text"
                    name="content"
                    id="content"
                    disabled = {true}
                    defaultValue={EditTicket.content}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
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
          </Form>
        </Container>
        </Fade>
    </div>
  );
};

export default EditTicket;
