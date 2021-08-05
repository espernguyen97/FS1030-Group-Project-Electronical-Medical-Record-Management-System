import React, { useState } from "react";
import { useHistory } from "react-router";
import Container from "@material-ui/core/Container";
import {
  Form,
  ButtonToggle,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Pulse from 'react-reveal/Pulse';
 
const EditUser = (props) => {
  let id = props.match.params.id;
  let EditUser = props.location.state;
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const [User, setUser] = useState({
    UserID: `${EditUser.UserID}`,
    Username: `${EditUser.Username}`,
    First_Name: `${EditUser.First_Name}`,
    Last_Name: `${EditUser.Last_Name}`,
    Email: `${EditUser.Email}`,
    Job_Position: `${EditUser.Job_Position}`,
    Admin_Flag: `${EditUser.Admin_Flag}`,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/users/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    }).then((response) => response.json());
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    if (id == currentUser.UserID) {
      sessionStorage.removeItem('currentUser')
      sessionStorage.setItem('currentUser', JSON.stringify(User))
      history.push(`/user-profile/${currentUser.UserID}`);
    } else {
      history.push("/caregivers")
    }
  };

  const handleChange = (event) => {
    event.persist();
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const checkAccess = () => {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    if (id == currentUser.UserID && !parseInt(currentUser.Admin_Flag)){
      return false
    } else {
      return true
    }   
  }
  const access = checkAccess()

  return (
    <div className="main-panel">
    <br/>
      <br/>
        <Pulse>
        <Container className="containerCU" fixed>
          <h1>Edit User: {User.First_Name} {User.Last_Name}</h1>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>Username:</Label>
                  <Input
                    type="text"
                    name="Username"
                    id="Username"
                    defaultValue={User.Username}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="First_Name"
                    id="firstName"
                    defaultValue={User.First_Name}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="Last_Name"
                    id="Last_Name"
                    defaultValue={User.Last_Name}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="Email"
                    id="Email"
                    defaultValue={User.Email}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              {access
                ? <Col md={6}>
                  <FormGroup>
                    <Label>Job Position</Label>
                    <Input
                      type="text"
                      name="Job_Position"
                      id="Job_Position"
                      defaultValue={User.Job_Position}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                : null
              }
            </Row>
            {access
              ? <FormGroup>
                <Label>Admin Flag</Label>
                <Input
                  type="text"
                  name="Admin_Flag"
                  id="Admin_Flag"
                  defaultValue={User.Admin_Flag}
                  onChange={handleChange}
                />
              </FormGroup>
              : null
            }
            <ButtonToggle type="submit" color="primary">Submit</ButtonToggle>
          </Form>
        </Container>
        </Pulse>
    </div>
  );
};

export default EditUser;
