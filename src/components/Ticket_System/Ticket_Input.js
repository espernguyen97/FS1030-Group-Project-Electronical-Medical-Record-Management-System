import React, { useEffect, useState } from "react";
import { Input, Form, FormGroup, Col, Button, Container} from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from '@material-ui/core/Tooltip';
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import parseJwt from "../../helpers/authHelper";
import Swal from "sweetalert2";
import Slide from 'react-reveal/Slide'



function MakeID(len) {
  let text = "";
  
  let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
  for (let i = 0; i < len; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  
  return text;
}

const SQLDateParsed = () => {
  // MySQL formatted UTC
  let d = new Date();
  let SQLDate = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds()
  )
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return SQLDate;
};

const TicketInput = () => {
  const token = sessionStorage.getItem("token");// eslint-disable-next-line
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const Date =  SQLDateParsed();
  const TicketNumber =  MakeID(64);
  const user = parseJwt(token).userEmail;// eslint-disable-next-line

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:4000/users/${user}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsername(data.Username);
    };
    getData();// eslint-disable-next-line
  }, [token]);


  const formSubmit = async event => {
    event.preventDefault()
    const response = await fetch('http://localhost:4000/tickets/entries', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({email,Username,content,Date,TicketNumber})
    })
    const payload = await response.json()
    if (response.status >= 400) {
        alert(`woops! Error: ${payload.message} for fields: ${payload.invalid.join(",")}`)
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Success!',
            titleText: 'Success' ,
            text: 'A New Ticket Has been Created. An Admin Will Be In Touch In The Next 24Hrs',
            confirmButtonColor: '#4BB543',
            
          })
        resetForm()
    }
}
const resetForm = () => {
    setEmail("")
    setUsername("")
    setContent("")
}
  return (
    <Slide top>
      <Container className="containerCU">
        <center>
                <img className="banner" src="assets/supportbanner.png" alt="#" />
          <h2>Caregiver Support</h2>
          <Form className="my-5" onSubmit={formSubmit}>
            <FormGroup>
                <InputLabel>
                  <b>Ticket Number</b><br/><br/>
                  <i>Keep this for your records</i>
                </InputLabel>
               <Col>
                    <Tooltip title="Keep This Ticket Number For Your Records.">
                    <Input disabled={true} type="text" name="TicketNumber" id="TicketNumber" value={TicketNumber}  />
                    </Tooltip>
              </Col>
              <br/>
                <InputLabel>
                  <b>Email</b>
                </InputLabel>
               <Col>
                    <Tooltip title="Enter an email we can easily get in touch with you at.">
                    <Input type="email" name="email" id="emailEntry" placeholder="Enter an email we can easily get in touch with you."  required value={email} onChange={e => setEmail(e.target.value) }/>
                    </Tooltip>
              </Col>
              <br/>
              <Col>
                <InputLabel>
                  <b>Username</b>
                </InputLabel>
                <Tooltip title="Your Username will display here">
                  <Input
                    type="Username"
                    name="Username"
                    id="Username"
                    placeholder="Select Your Username"
                    value={Username}
                    disabled="true"
                  />
                </Tooltip>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col>
                <InputLabel>
                  <b>Ticket</b>
                </InputLabel>
                <Tooltip title="Example: UserID:2 Abigail Wilson has an issue when I try to add a new medical history... Give as much info as possible so we can assist in a timely fashion">
                  <Input
                    type="textarea"
                    name="content"
                    id="content"
                    placeholder="Example: UserID:2 Abigail Wilson has an issue when I try to add a new medical history... Give as much info as possible so we can assist in a timely fashion Here"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Tooltip>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col>
                <p style={{ fontStyle: "italic" }}>
                  Fill out all fields to create a new Ticket
                </p>
                <Button color="primary" type="submit">
                  <NoteAddIcon />
                  Create Ticket
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </center>
      </Container>
</Slide>
  );
};

export default TicketInput;
