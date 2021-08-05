import React from 'react';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import CreateUser from '../Users/CreateUser';
import PwGen from '../Users/pwgen';
import UserList from '../Users/CareGiver_list';


export default function Caregivers() {
    return (
      <div className="main-panel">
        <Container fixed>
        <hr className="yellow"/>
            <Row className="my-5">
                  <Col>
                      <CreateUser/> {/* Create User Section*/}
                  </Col>
                  <Col>
                      <PwGen/> {/* Password Gen*/}
                  </Col>
            </Row>
                  <Col>
                    <center><UserList/></center> {/* User List*/}
                  </Col>
        <hr className="yellow"/>
        </Container>
      </div>
    );
  }
  