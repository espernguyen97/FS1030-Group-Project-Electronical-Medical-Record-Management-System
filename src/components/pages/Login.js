import React, { useState } from 'react'
import { Container, Col,Button, Form, FormGroup,Row} from 'reactstrap'
import Input from '@material-ui/core/Input';
import { useHistory } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';
import PersonIcon from '@material-ui/icons/Person';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/Lock';
import Flip from 'react-reveal/Flip';
import ForgotPassword from '../Forgotpw';
import Swal from 'sweetalert2'

const Login = (props) => {
    let history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginSubmit = async event => { 
        event.preventDefault()
        //First fetch request to get JWT
        const response = await fetch('http://localhost:4000/auth', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email, password})
        })
        const payload = await response.json()
        if (response.status >= 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            titleText: 'Error' ,
            text: 'Something went wrong! The Password or Email is Incorrect.',
            confirmButtonColor: '#4BB543',
          })
        } else {
            sessionStorage.setItem('token', payload.token)
            let status = sessionStorage.getItem('token')
            props.setToken(status)
            //Second fetch request to get current user by email
            const response2 = await fetch(`http://localhost:4000/users/${email}`, {
              method: 'GET',
              mode: 'cors',
              headers: {
                  'Authorization': `Bearer ${status}`
              }
            })
            if (response2.status >= 400){
              return
            }
            const currentUser = await response2.json()
            delete currentUser.Password
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser))
            props.setUser(currentUser)
            if (currentUser.Admin_Flag) {
              history.push("/CareGivers")
            } else {
              history.push("/Patients")
            }
        }
    }

    return (<Flip left>
      <main><center>
        <br/><br/>
        <Container>
        <div className="backgroundjumbo">
          <center><img className="loginimg" src="./Assets/login.png" alt="Doctor Logo" /></center>
          <h1>Login</h1>
          <Form className="my-5" onSubmit={loginSubmit}>
            <FormGroup row>
              <Col>
              <InputLabel htmlFor="input-with-icon-adornment">Email Address</InputLabel>
                            <PersonIcon/> 
                    <Tooltip title="Enter Your Login Email Here">
                      <Input type="text" name="username" id="usernameEntry" placeholder="Valid email address" value={email} onChange={e => setEmail(e.target.value)}/>
                    </Tooltip>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col >
              <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
                                <LockIcon/>
                    <Tooltip title="Enter Your Password Here">
                        <Input type="password" name="password" id="passwordEntry" placeholder="Valid password" onChange={e => setPassword(e.target.value)}/>
                        </Tooltip>
              </Col>
            </FormGroup><br/><br/>
            <Row>
              <Col>
            <Button color="primary">Sign in</Button>
              </Col>
              <Col>
            <ForgotPassword buttonLabel="Forgot Password" />
              </Col>
            </Row>
          </Form>
          </div>
        </Container>
        </center>
      </main>
      </Flip>
    )
}

export default Login