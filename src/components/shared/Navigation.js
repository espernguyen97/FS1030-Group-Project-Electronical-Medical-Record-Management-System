import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container } from 'reactstrap'
import { Redirect, Route } from "react-router-dom"
import Scroll from '../backtotop'


const Navigation = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

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
                    <NavItem>
                        <p id="user-info"><span style={{fontStyle: "italic"}}>logged in as</span>{String.fromCharCode(8194)}<span style={{fontWeight: "bold"}}>{props.user.Job_Position} {props.user.First_Name} {props.user.Last_Name}</span></p>
                    </NavItem>
                }          
            </Nav>
        </Collapse>
        <Scroll showBelow={250} />
        </Container>
        
    </Navbar>
)
}

export default Navigation