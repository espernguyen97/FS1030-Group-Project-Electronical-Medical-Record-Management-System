import React from 'react';
import {Button, Container} from 'reactstrap'

const NotFound = () => {
  return <Container><br/><br/><center><img src="assets/login.png" alt="404 Error message Page not found" /><br/><br/>
  <h1>Page Not Found</h1>
  <Button color="warning" href="/">Return Home</Button></center>
  </Container>
  ;
}

export default NotFound;