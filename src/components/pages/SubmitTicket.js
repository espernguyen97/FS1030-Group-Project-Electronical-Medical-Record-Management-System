import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import TicketInput from '../Ticket_System/Ticket_Input';
import SideNav from '../shared/SideNav';

export default function SubmitTicket() {
    return (
      <React.Fragment>
          <SideNav/>
        <CssBaseline />
        <Container fixed>
        <hr class="yellow"/>
            <Row className="my-5">
                  <Col>
                      <TicketInput/> {/* Create User Section*/}
                  </Col>
            </Row>
        <hr class="yellow"/>
        </Container>
      </React.Fragment>
    );
  }
  