import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import EnhancedTable from '../userlist/list';
import SideNav from '../shared/SideNav';
import Search from '../search';
import PatientCreateModal from '../Patients/Create_Modal';

export default function Patients() {
    return (
      <React.Fragment>
          <SideNav/>
        <CssBaseline />
        <Container fixed>
          <center>
        <hr class="yellow"/>
            <Row className="my-5">
                <Col>
                  <Search/>{/* search bar*/}
                  <br/>
                  <EnhancedTable/> {/* Create User Section*/}
                </Col>
            </Row>
            <PatientCreateModal/>
        <hr class="yellow"/>
          </center>
        </Container>
      </React.Fragment>
    );
  }
  