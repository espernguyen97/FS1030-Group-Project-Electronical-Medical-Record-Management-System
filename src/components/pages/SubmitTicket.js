import React from 'react';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import TicketInput from '../Ticket_System/Ticket_Input';

export default function SubmitTicket() {
    return (
      <div className="main-panel">
        <Container fixed>
            <Row className="my-5">
                  <Col>
                      <TicketInput/> {/* Create User Section*/}
                  </Col>
            </Row>
        </Container>
      </div>
    );
  }
  