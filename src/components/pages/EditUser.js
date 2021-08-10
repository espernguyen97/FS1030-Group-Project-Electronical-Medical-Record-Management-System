import React, { useState } from "react";
import { useHistory } from "react-router";
import Container from "@material-ui/core/Container";
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import {
  Form,
  ButtonToggle,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Fade from 'react-reveal/Fade';
 
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
  const [alertContent, setAlertContent] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:4000/users/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    })
    const payload = await response.json()
    if (response.status === 400) {
      setAlertContent(payload)
    } else {
      let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
      if (parseInt(id) === currentUser.UserID) {
        sessionStorage.removeItem('currentUser')
        sessionStorage.setItem('currentUser', JSON.stringify(User))
        history.push(`/user-profile/${currentUser.UserID}`)
      } else {
        history.push("/caregivers")
      }
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
    if (id === currentUser.UserID && !parseInt(currentUser.Admin_Flag)){
      return false
    } else {
      return true
    }   
  }
  const access = checkAccess()

  return (
    <div className="main-panel">
      <br/>
    <Fade top>
        <Container className="containerCU" fixed>
          <h1>Edit User: {User.First_Name} {User.Last_Name}</h1>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <p style={{fontStyle: "italic"}}>All fields are required.</p>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>Username</Label>
                  <Tooltip title="Max length 20 characters and cannot include spaces">
                    <Input type="text" name="Username" id="Username" required
                      defaultValue={User.Username}
                      onChange={handleChange}
                    />
                  </Tooltip>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>First Name</Label>
                  <Tooltip title="Max length 20 characters and cannot include spaces">
                    <Input type="text" name="First_Name" id="firstName" required
                      defaultValue={User.First_Name}
                      onChange={handleChange}
                    />
                  </Tooltip>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Tooltip title="Max length 20 characters and cannot include spaces">
                    <Input type="text" name="Last_Name" id="Last_Name" required
                      defaultValue={User.Last_Name}
                      onChange={handleChange}
                    />
                  </Tooltip>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" name="Email" id="Email" required
                    defaultValue={User.Email}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              {access
                ? <Col md={6}>
                  <FormGroup>
                    <Label>Job Position</Label>
                    <br/>
                    <Input type="select" style={{textAlign: "center"}} name="Job_Position" id="Job_Position" required 
                      defaultValue={User.Job_Position}
                      onChange={handleChange}
                    >
                        <option value={User.Job_Position}>--Current: {User.Job_Position}--</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Admin">Admin</option>
                    </Input>
                  </FormGroup>
                </Col>
                : null
              }
            </Row>
            {access
              ? <FormGroup>
                <Label>Admin Flag</Label>
                <Checkbox color="primary" className="Admin_Flag" name="Admin_Flag" id="Admin_Flag" checked={parseInt(User.Admin_Flag) ? true : false}
                onChange={event => setUser((prevState) => ({...prevState,[event.target.name]: event.target.checked ? "1" : "0"}))}               
                />
              </FormGroup>
              : null
            }
            <div style={{color: "red"}} className={`alert ${!alertContent ? "hidden" : ""}`}>{alertContent}</div>
            <ButtonToggle type="submit" color="primary">Submit</ButtonToggle>
            <br/><br/>
          </Form>
        </Container>
        </Fade>
    </div>
  );
};

export default EditUser;
