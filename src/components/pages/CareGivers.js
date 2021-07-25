import React from 'react';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import CreateUser from '../Users/CreateUser';
import PwGen from '../Users/pwgen';
import UserlistModal from '../Users/Create_Modal_User';

export default function Caregivers() {
    return (
      <div className="main-panel">
        <Container fixed>
        <hr class="yellow"/>
            <center><UserlistModal/></center>
            <Row className="my-5">
                  <Col>
                      <CreateUser/> {/* Create User Section*/}
                  </Col>
                  <Col>
                      <PwGen/> {/* Password Gen*/}
                  </Col>
            </Row>
        <hr class="yellow"/>
        </Container>
      </div>
    );
  }
  