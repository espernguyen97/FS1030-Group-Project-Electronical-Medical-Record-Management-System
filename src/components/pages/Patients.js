import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Row,Col} from 'reactstrap';
import EnhancedTable from '../userlist/list';
import SideNav from '../shared/SideNav';
import Search from '../search';

export default function Patients() {
    return (
      <React.Fragment>
          <SideNav/>
        <CssBaseline />
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
  