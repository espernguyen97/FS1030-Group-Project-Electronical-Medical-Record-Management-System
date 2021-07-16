import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import CU from './CU';
import PwGen from '../pwgen/pwgen';
import SideNav from '../shared/SideNav';

export default function Caregivers() {
    return (
      <React.Fragment>
          <SideNav/>
        <CssBaseline />
        <Container fixed>
        <hr class="yellow"/>
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
      </React.Fragment>
    );
  }
  