import React from 'react';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import CU from './CU';
import PwGen from '../pwgen/pwgen';
import UserlistModal from '../userlist/Create_Modal_User';

export default function Caregivers() {
    return (
      <div className="main-panel">
        <Container fixed>
        <hr class="yellow"/>
            <center><UserlistModal/></center>
            <Row className="my-5">
                  <Col>
                      <CU/> {/* Create User Section*/}
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
  