import React from 'react'
import { Container} from 'reactstrap'
import TeamModal from '../TeamModal';

const Footer = () => {
    return(
    <footer style={{backgroundColor: '#000', opacity: '95%'}}>
        <Container>
            <center><TeamModal/></center>
        </Container>
    </footer>
  )
}

export default Footer