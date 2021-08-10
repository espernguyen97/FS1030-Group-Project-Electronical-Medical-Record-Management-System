import React from 'react';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import PatientsSearchList from '../Patients/PatientsSearch&List';
import Fade from 'react-reveal/Fade';

export default function Patients() {
    return (
      <Fade>
        <div className="main-panel">
          <Container fixed>
            <br/><br/>
            <center>
              <Row>
                  <Col>
                    <PatientsSearchList/>{/* patient create modal, search bar, and patient list */}
                  </Col>
              </Row>
            </center>
          </Container>
        </div>
      </Fade>
    );
  }
