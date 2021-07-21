import React from 'react';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import TicketInput from '../Ticket_System/Ticket_Input';

export default function SubmitTicket() {
    return (
      <div className="main-panel">
        <Container fixed>
        <hr class="yellow"/>
            <Row className="my-5">
                  <Col>
                      <TicketInput/> {/* Create User Section*/}
                  </Col>
            </Row>
        <hr class="yellow"/>
        </Container>
      </div>
    );
  }
  