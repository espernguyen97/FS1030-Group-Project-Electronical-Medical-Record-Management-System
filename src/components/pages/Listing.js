import React from 'react';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import Fade from 'react-reveal/Fade';
import AdminPanel from '../Adminpanel';

export default function Listing() {

    return (
      <Fade>
      <div className="main-panel">
        <Container fixed>
          <br/>
          <br/>
          <center>
            <Col>
            </Col>
            <Row className="my-5">
                <Col>
                  <AdminPanel/>
                </Col>
            </Row>
        </center>
        </Container>
      </div>
      </Fade>
    );
  }
