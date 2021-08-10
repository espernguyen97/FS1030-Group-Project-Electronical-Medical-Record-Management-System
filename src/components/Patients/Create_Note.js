import React, { useEffect, useState } from "react";
import { Input, Form, FormGroup, Col, Button, Container } from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from "@material-ui/core/Tooltip";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import parseJwt from "../../helpers/authHelper";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

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

const PatientCreate = () => {
  const location = useLocation();
  const token = sessionStorage.getItem("token");// eslint-disable-next-line
  const [PatientID, setPatientID] = useState(location.state.PatientID);
  const [Username, setUsername] = useState("");
  const [Note, setNote] = useState("");
  const [alertContent, setAlertContent] = useState(null);
  const Date = SQLDateParsed();
  const user = parseJwt(token).userEmail;// eslint-disable-next-line
  const [patients, setPatients] = useState([]);

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

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:4000/patients/", {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPatients(data);
    };
    getData();
  }, [token]);

  const formSubmit = async (event) => {
    event.preventDefault();
    if (Note.length > 20) {
      const response = await fetch("http://localhost:4000/notes", {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Note, PatientID, Username, Date }),
      });
      const payload = await response.json();
      if (response.status >= 400) {
        setAlertContent(`Error with fields: ${payload.invalid.join(",")}`);
      } else {
        setAlertContent(null);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success!",
          titleText: "Success",
          text: "A New Note Has been Created.",
          confirmButtonColor: "#4BB543",
          timer: 1500,
        });
        resetForm();
      }
    } else {
      setAlertContent(`Please enter a minimum of 20 characters for the note.`);
    }
  };

  const resetForm = () => {
    setNote("");
  };
  return (
    <main>
      <Container className="containerPatient_Create">
        <center>
          <h2>Add Patient Note</h2>
          <Form className="my-5" onSubmit={formSubmit}>
            <FormGroup>
              <Col>
                <InputLabel>
                  <b>PatientID</b>
                </InputLabel>
                <Tooltip title="Patient ID will display here">
                  <Input
                    type="PatientID"
                    name="PatientID"
                    id="PatientID"
                    placeholder="Enter The Patient ID"
                    value={PatientID}
                    disabled="true"
                  />
                </Tooltip>
              </Col>
            </FormGroup>
            <FormGroup>
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
                  <b>Note</b>
                </InputLabel>
                <Tooltip title="Enter The Note For the Patient">
                  <Input
                    type="textarea"
                    name="Note"
                    id="Note"
                    placeholder="Note Here"
                    required
                    value={Note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </Tooltip>
              </Col>
            </FormGroup>
            <div className={`alert ${!alertContent ? "hidden" : ""}`}>
              {alertContent}
            </div>
            <FormGroup check row>
              <Col>
                <p style={{ fontStyle: "italic" }}>
                  Fill out all fields to add a patient note
                </p>
                <Button color="primary" type="submit">
                  <NoteAddIcon />
                  Add Note
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </center>
      </Container>
    </main>
  );
};

export default PatientCreate;
