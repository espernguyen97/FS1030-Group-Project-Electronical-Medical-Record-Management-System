import React, { useState } from 'react'
import { Container, Col,Button, Form, FormGroup} from 'reactstrap'
import Input from '@material-ui/core/Input';
import { useHistory, useLocation } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';
import PersonIcon from '@material-ui/icons/Person';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/Lock';
import Flip from 'react-reveal/Flip';

const Login = (props) => {
    let history = useHistory();
    let location = useLocation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alertContent, setAlertContent] = useState(null)

    const loginSubmit = async event => { 
        event.preventDefault()
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
            setAlertContent('Wrong Info Given Please Try Again')
        } else {
            sessionStorage.setItem('token', payload.token)
            let { from } = location.state || { from: { pathname: "/submissions" } }
            history.replace(from)
            let status = sessionStorage.getItem('token')
            props.setToken(status)
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
            <div className={`alert ${!alertContent ? "hidden" : ""}`}>{alertContent}</div>
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
            </FormGroup>
            <Button color="warning">Sign in</Button>
          </Form>
          </div>
        </Container>
        </center>
      </main>
      </Flip>
    )
}

export default Login