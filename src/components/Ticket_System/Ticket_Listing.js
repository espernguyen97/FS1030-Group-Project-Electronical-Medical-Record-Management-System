import React, { useEffect, useState } from "react";
import { parseJwt } from "../../helpers/authHelper";
import { Container,Table, Button,Row } from "reactstrap";
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Fade from 'react-reveal/Fade';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PageviewIcon from '@material-ui/icons/Pageview';
import { useHistory } from "react-router";

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
  const [tickets, setticket] = useState([]);
  const ticket = parseJwt(token).ticketname;
  const history = useHistory();

  const getData = async () => {
    const response = await fetch("http://localhost:4000/tickets/entries", {
      method: "GET",
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setticket(data);
  };
  // eslint-disable-next-line
  useEffect(() => {getData()}, [token]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setTimeout(() => {
      fetch(`http://localhost:4000/ticketsearch?key=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((tickets) => {
          setticket(tickets)
        });
    }, 100);
  };

  
  const ticketEditRoute = (event, ticket) => {
    event.preventDefault();
    let path = `/tickets/entries/${ticket.TicketID}`
    history.push(path, ticket);
}

  const ticketDelete = async (event, ticket) => {
  event.preventDefault()
  console.log(ticket)
  const response = await fetch(`http://localhost:4000/tickets/entries/${ticket.TicketID}`, {
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


  const resetState = () => {
    getData()
    document.getElementById("ticket-searchbar").value = ""
    setQuery(null)
  }

  return (
    <Container>
    <center>
    <Fade>
    <Container className="mainContent">
      <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        onChange={handleSearch}
        className={classes.input}
        id="ticket-searchbar"
        placeholder="Search ticket Database"
        inputProps={{ 'aria-label': 'Search ticket Database' }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <RotateLeftIcon type="reset" onClick={resetState} />
      </IconButton>
    </Paper>
    <br/><br/>
      {query && <p>Results for: {query}</p>}
      <Row className="ticketTitle">
        <h2 className="display-5">
          Total tickets:{tickets.length}
          {ticket}
        </h2>
      </Row>
      <Table responsive className="content">
        <thead>
          <tr>
            <th>Username</th>
            <th>Date</th>
            <th>Issue</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                <i>No tickets found</i>
              </td>
            </tr>
          )}
          {tickets.length > 0 &&
            tickets.map((ticket) => (
              <tr>
                        <td>{ticket.Username}</td>
                        <td>{moment(ticket.Date).format("YYYY-MM-DD")}</td>
                        <td>{ticket.content}</td>
                        <td>{ticket.Completed}</td>
                        <td style={{whiteSpace: "nowrap"}}></td>
                <td>
                  {" "}
                  <Button color="success" onClick={(e) => ticketEditRoute(e, ticket)}>
                    <PageviewIcon />
                  </Button>
                  <Button color="danger" onClick={(e) => ticketDelete(e, ticket)}>
                    <DeleteForeverIcon />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
    </Fade>
    </center>
    </Container>
  );
};

export default Search;
