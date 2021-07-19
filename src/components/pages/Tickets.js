import React from 'react';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import TicketSubmissionsList from '../Ticket_System/Ticket_Listing';

export default function TicketList() {
    return (
      <div className="main-panel">
        <Container fixed>
        <hr class="yellow"/>
            <Row className="my-5">
                  <Col>
                      <TicketSubmissionsList/> {/* Create User Section*/}
                  </Col>
            </Row>
        <hr class="yellow"/>
        </Container>
      </div>
    );
  }
  