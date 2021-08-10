import React from 'react';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import Search from '../search';
import PatientCreateModal from '../Patients/Create_Modal';
import Fade from 'react-reveal/Fade';

export default function Patients() {
    return (
      <Fade>
      <div className="main-panel">
        <Container fixed>
          <br/>
          <br/>
          <center>
            <Col>
              <PatientCreateModal/>
            </Col>
            <Row className="my-5">
                <Col>
                  <Search/>{/* search bar*/}
                </Col>
            </Row>
        </center>
        </Container>
      </div>
      </Fade>
    );
  }
