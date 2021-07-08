import React from 'react'
import { Container,Row,Col} from 'reactstrap'
import AdminPanel from '../Adminpanel';
import Pulse from 'react-reveal/Pulse';



const Listings = () => {
    return (
        <Container>
            <br/><br/>
                <Row>
                    <Col>
                        <Pulse>
                            <AdminPanel/> 
                        </Pulse>
                    </Col>
                </Row>
        </Container>
    )
}

export default Listings