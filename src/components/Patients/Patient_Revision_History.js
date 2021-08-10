import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Container } from "reactstrap";
import { Table, Row } from "reactstrap";
import moment from "moment";

const PatientRevisionHistory = (props) => {
    const token = sessionStorage.getItem("token");
    const { id } = useParams();
    const [revisions, setRevisions] = useState([])

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:4000/patient-revisions/${id}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            setRevisions(data)
        })()// eslint-disable-next-line
    }, [token])

    return (
        <Container className="mainContent">
            <Row className="userTitle">
                <h2 className="display-5">
                    Total revision_history: {revisions.length}
                </h2>
            </Row>
            {!revisions.length
                ? <p>No changes have been made to this patient's details.</p>
                : <Table responsive className="content">
                    <thead>
                        <tr>
                            <th>Revisions</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {revisions.map(revision => {
                        return (
                            <tr>
                                <td>{revision.Revision}</td>
                                <td>{moment(revision.Date).format("YYYY-MM-DD")}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            }
        </Container>
    )
}

export default PatientRevisionHistory