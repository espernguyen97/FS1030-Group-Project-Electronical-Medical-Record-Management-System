import React, { useEffect, useState } from "react";
import parseJwt from "../../helpers/authHelper";
import { Container } from "reactstrap";
import { Table, Row } from "reactstrap";
import moment from "moment";
import { useLocation } from "react-router-dom";

const Notes = () => {
  const token = sessionStorage.getItem("token");
  const user = parseJwt(token).username;
  const [notes, setnotes] = useState([]);
  const location = useLocation();
  const noteID = location.state.PatientID;


  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:4000/notes/${noteID}`, {
        method: "GET",
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setnotes(data);
    };
    getData();// eslint-disable-next-line
  }, [token]);

 

  return (
    <Container className="mainContent">
      <Row className="userTitle">
        <h2 className="display-5">
          Total notes:{notes.length}
          {user}
        </h2>
      </Row>
      <Table responsive className="content">
        <thead>
          <tr>
            <th>Created By</th>
            <th>Date</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {notes.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                <i>No notes found</i>
              </td>
            </tr>
          )}
          {notes.length > 0 &&
            notes.map((Notes) => (
              <tr>
                <td>{Notes.Username}</td>
                <td>{moment(Notes.Date).format("YYYY-MM-DD")}</td>
                <td>{Notes.Note}</td>
                <td>
                  {" "}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <br/><br/>
    </Container>
  );
};

export default Notes;
