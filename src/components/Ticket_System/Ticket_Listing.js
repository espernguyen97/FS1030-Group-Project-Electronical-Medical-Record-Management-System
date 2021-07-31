import React, { useEffect, useState } from "react";
import parseJwt from "../../helpers/authHelper";
import { Container } from "reactstrap";
import { Table, Button, Row } from "reactstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useHistory } from "react-router";
import moment from "moment";
import VisibilityIcon from '@material-ui/icons/Visibility';

const TicketSubmissionsList = () => {
  const token = sessionStorage.getItem("token");
  const user = parseJwt(token).username;
  const [Tickets, setTickets] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:4000/tickets/entries", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTickets(data);
    };
    getData();
  }, [token]);

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

  return (
    <Container className="mainContent">
      <Row className="userTitle">
        <h2 className="display-5">
          Total Tickets:{Tickets.length}
          {user}
        </h2>
      </Row>
      <Table responsive className="content">
        <thead>
          <tr>
            <th>Username</th>
            <th>Date</th>
            <th>Issue</th>
          </tr>
        </thead>
        <tbody>
          {Tickets.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                <i>No Tickets found</i>
              </td>
            </tr>
          )}
          {Tickets.length > 0 &&
            Tickets.map((ticket) => (
              <tr>
                <td>{ticket.Username}</td>
                <td>{moment(ticket.Date).format("YYYY-MM-DD")}</td>
                <td>{ticket.content}</td>
                <td>
                  {" "}
                  <Button color="primary" onClick={(e) => ticketEditRoute(e, ticket)}>
                    <VisibilityIcon />
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
  );
};

export default TicketSubmissionsList;
