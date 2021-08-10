import React, { useEffect, useState } from "react";
import { parseJwt } from "../../helpers/authHelper";
import { Container } from "reactstrap";
import { Table, Button, Row } from "reactstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useHistory } from "react-router";
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import EditIcon from "@material-ui/icons/Edit";
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = () => {
  const classes = useStyles();
  const token = sessionStorage.getItem("token");
  const [query, setQuery] = useState();
  const [users, setusers] = useState([]);
  const user = parseJwt(token).username;
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:4000/users/", {
        method: "GET",
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setusers(data);
    };
    getData();
  }, [token]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setTimeout(() => {
      fetch(`http://localhost:4000/usersearch?key=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((users) => {
          setusers(users)
        });
    }, 100);
  };

  const resetState = () => {
    window.location.reload();
  }

  const UserEditRoute = (event, User) => {
    event.preventDefault();
    let path = `/edit-user/${User.UserID}`
    history.push(path, User);
}

  const userDelete = async (event, user) => {
    event.preventDefault()
    console.log(user)
    const response = await fetch(`http://localhost:4000/users/${users.userID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    const data = await response.json();
    console.log(data)
    window.location.reload();
  }

  return (
    <Fade>
    <Container className="mainContent">
      <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        onChange={handleSearch}
        className={classes.input}
        placeholder="Search user Database"
        inputProps={{ 'aria-label': 'Search user Database' }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <RotateLeftIcon type="reset" onClick={resetState} />
      </IconButton>
    </Paper>
    <br/><br/>
      {query && <p>Results for: {query}</p>}
      <Row className="userTitle">
        <h2 className="display-5">
          Total users:{users.length}
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
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                <i>No users found</i>
              </td>
            </tr>
          )}
          {users.length > 0 &&
            users.map((user) => (
              <tr>
                <td>{user.First_Name}</td>
                <td>{user.Last_Name}</td>
                <td>{moment(user.Last_Login).format("YYYY-MM-DD")}</td>
                        <td>{user.Username}</td>
                        <td>{user.Job_Position}</td>
                        <td>{user.Email}</td>
                        <td>{(user.Admin_Flag === 1) ? "true" : "false"}</td>
                        <td style={{whiteSpace: "nowrap"}}></td>
                <td>
                  {" "}
                  <Button color="primary" onClick={(e) => UserEditRoute(e, user)}>
                    <EditIcon/>
                  </Button>                 
                  {String.fromCharCode(160)}
                  <Button color="danger" onClick={(e) => userDelete(e, user)}>
                    <DeleteForeverIcon />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
    </Fade>
  );
};

export default Search;
