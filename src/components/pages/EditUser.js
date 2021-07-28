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

const EditUser = (props) => {
  let id = props.match.params.id;
  let EditUser = props.location.state;
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const [User, setUser] = useState({
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
    history.push("/CareGivers");
  };

  const handleChange = (event) => {
    event.persist();
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="main-panel">
        <Container className="my-5" fixed>
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
              <Col md={6}>
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
            </Row>
            <FormGroup>
              <Label>Admin Flag</Label>
              <Input
                type="text"
                name="Admin_Flag"
                id="Admin_Flag"
                defaultValue={User.Admin_Flag}
                onChange={handleChange}
              />
            </FormGroup>
            <ButtonToggle type="submit" color="primary">Submit</ButtonToggle>
          </Form>
        </Container>
    </div>
  );
};

export default EditUser;
