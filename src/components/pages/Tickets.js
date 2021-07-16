import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import TicketSubmissionsList from '../Ticket_System/Ticket_Listing';
import SideNav from '../shared/SideNav';

export default function TicketList() {
    return (
      <React.Fragment>
          <SideNav/>
        <CssBaseline />
        <Container fixed>
        <hr class="yellow"/>
            <Row className="my-5">
                  <Col>
                      <TicketSubmissionsList/> {/* Create User Section*/}
                  </Col>
            </Row>
        <hr class="yellow"/>
        </Container>
      </React.Fragment>
    );
  }
  