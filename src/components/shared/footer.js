import React from 'react'
import { Container } from 'reactstrap'

const Footer = () => {
    return(
    <footer style={{backgroundColor: '#000', opacity: '95%'}}>
        <Container>
            <p className="m-0 text-center text-white">Copyright &copy; FS1030 Group D 2021</p>
        </Container>
    </footer>
  )
}

export default Footer