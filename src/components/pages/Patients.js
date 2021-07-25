import React from 'react';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import PatientList from '../Patients/Patient_list';
import Search from '../search';
import PatientCreateModal from '../Patients/Create_Modal';

export default function Patients() {
    return (
      <div className="main-panel">
        <Container fixed>
          <center>
        <hr class="yellow"/>
            <Col>
              <PatientCreateModal/>
            </Col>
            <Row className="my-5">
                <Col>
                  <Search/>{/* search bar*/}
                  <PatientList/> {/* userlist*/}
                </Col>
            </Row>
        <hr class="yellow"/>
        </center>
        </Container>
      </div>
    );
  }
