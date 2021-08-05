import React, { useEffect, useState } from "react";
import parseJwt from "../../helpers/authHelper";
import { Container } from "reactstrap";
import { Table, Button, Row } from "reactstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router";
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightRegular,
    width: "100%",
    textDecoration: "underline"
  },
}));

const UserList = () => {
  const classes = useStyles();
  const token = sessionStorage.getItem("token");
  const user = parseJwt(token).username;
  const [Users, setUsers] = useState([]);
  const history = useHistory();

  const getData = async () => {
    const response = await fetch("http://localhost:4000/users/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {getData()}, []);

  const UserEditRoute = (event, User) => {
      event.preventDefault();
      let path = `/edit-user/${User.UserID}`
      history.push(path, User);
  }

  const UserDelete = async (event, User) => {
    event.preventDefault()
    const response = await fetch(`http://localhost:4000/Users/${User.UserID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    const data = await response.json();
    getData();
  }

  return (
    <Container className="mainContent">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>User/CareGiver List</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
              <Row className="userTitle">
                <h2 className="display-5" style={{paddingLeft: "10px"}}>
                  Total Users:{Users.length}
                  {user}
                </h2>
              </Row>
              <Table responsive className="content">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Last login</th>
                    <th>Username</th>
                    <th>Job Position</th>
                    <th>Email Address</th>
                    <th>Admin_Flag</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Users.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <i>No Users found</i>
                      </td>
                    </tr>
                  )}
                  {Users.length > 0 &&
                    Users.map((User) => (
                      <tr>
                        <td>{User.First_Name}</td>
                        <td>{User.Last_Name}</td>
                        <td>{moment(User.Last_Login).format("YYYY-MM-DD")}</td>
                        <td>{User.Username}</td>
                        <td>{User.Job_Position}</td>
                        <td>{User.Email}</td>
                        <td>{(User.Admin_Flag === 1) ? "true" : "false"}</td>
                        <td style={{whiteSpace: "nowrap"}}>
                          {" "}
                          <Button color="primary" onClick={(e) => UserEditRoute(e, User)}>
                            <EditIcon />
                          </Button>
                          {String.fromCharCode(160)}
                          <Button color="danger" onClick={(e) => UserDelete(e, User)}>
                            <DeleteForeverIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </Container>
  );
};

export default UserList;
