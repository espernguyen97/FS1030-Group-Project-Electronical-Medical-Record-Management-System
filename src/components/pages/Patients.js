import React from 'react';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import EnhancedTable from '../userlist/list';
import Search from '../search';
import PatientCreateModal from '../Patients/Create_Modal';

export default function Patients() {
    return (
      <div className="main-panel">
        <Container fixed>
          <center>
        <hr class="yellow"/>
            <Row className="my-5">
                <Col>
                  <Search/>{/* search bar*/}
                  <EnhancedTable/> {/* Create User Section*/}
                </Col>
            </Row>
            <PatientCreateModal/>
        <hr class="yellow"/>
        </center>
        </Container>
      </div>
    );
  }
