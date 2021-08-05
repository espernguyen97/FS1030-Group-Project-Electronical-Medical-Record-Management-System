import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container } from 'reactstrap'
import { Redirect, Route } from "react-router-dom"
import { useHistory } from "react-router";
import Scroll from '../backtotop'


const Navigation = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    const history = useHistory();

    const profileViewRoute = (event, user) => {
        event.preventDefault();
        let path = `/user-profile/${user.UserID}`
        history.push(path, user);
    }

return (
    <Navbar style={{backgroundColor: '#000', opacity: '95%'}} expand="md" fixed="top">
        <Container>
        <NavbarBrand href=""><img className="navimg" src="./assets/login.png" alt="#" /> EMR SYSTEM</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <Route exact path="/">
                     <Redirect to="/submissions" />
                </Route>
                {props.user &&
                    <>
                        <NavItem>
                            <p id="user-info"><span style={{fontStyle: "italic"}}>logged in as</span>{String.fromCharCode(8194)}<span style={{fontWeight: "bold"}}>{props.user.Job_Position} {props.user.First_Name} {props.user.Last_Name}</span></p>
                        </NavItem>
                        <NavItem>
                            <button type="button" className="silver-btn" onClick={(e) => profileViewRoute(e, props.user)}>Profile</button>
                        </NavItem>
                    </>
                }          
            </Nav>
        </Collapse>
        <Scroll showBelow={250} />
        </Container>
        
    </Navbar>
)
}

export default Navigation