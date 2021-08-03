import React, { useEffect, useState } from "react";
import parseJwt from "../../helpers/authHelper";
import { Container } from "reactstrap";
import { Table, Button, Row } from "reactstrap";
import PageviewIcon from '@material-ui/icons/Pageview';
import { useHistory } from "react-router";
import moment from "moment";

const MedicalHistory = () => {
  const token = sessionStorage.getItem("token");
  const user = parseJwt(token).username;
  const [medical_history, setmedical_history] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:4000/medical_history/", {
        method: "GET",
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setmedical_history(data);
    };
    getData();
  }, [token]);

  const medical_historyViewRoute = (event, medical_history) => {
    event.preventDefault();
    let path = `/medical_history/${medical_history.Medical_H}`
    history.push(path, medical_history);
  }

  return (
    <Container className="mainContent">
      <Row className="userTitle">
        <h2 className="display-5">
          Total medical_history: {medical_history.length}
          {user}
        </h2>
      </Row>
      <Table responsive className="content">
        <thead>
          <tr>
            <th>Last Update</th>
            <th>Fever</th>
            <th>Covid Check</th>
            <th>Prescriptions</th>
          </tr>
        </thead>
        <tbody>
          {medical_history.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                <i>No medical_history found</i>
              </td>
            </tr>
          )}
          {medical_history.length > 0 &&
            medical_history.map((medical_history) => (
              <tr>
                <td>{moment(medical_history.Date).format("YYYY-MM-DD")}</td>
                <td>{medical_history.Fever}</td>
                <td>{medical_history.Covid_Checked}</td>
                <td>{medical_history.Prescriptions}</td>
                <td>
                  {" "}
                  <Button color="success" onClick={(e) => medical_historyViewRoute(e, medical_history)}>
                    <PageviewIcon/>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MedicalHistory;
