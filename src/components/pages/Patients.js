import React from 'react';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import EnhancedTable from '../userlist/list';
import Search from '../search';

export default function Patients() {
    return (
      <React.Fragment>
        <Container fixed>
        <hr class="yellow"/>
            <Row className="my-5">
                <Col>
                  <EnhancedTable/> {/* Create User Section*/}
                </Col>
                <Col>
                  <Search/>{/* search bar*/}
                </Col>
            </Row>
        <hr class="yellow"/>
        </Container>
      </React.Fragment>
    );
  }
  