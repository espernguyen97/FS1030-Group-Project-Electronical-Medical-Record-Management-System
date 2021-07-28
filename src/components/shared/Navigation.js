import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap'
import { NavLink as RouteLink } from 'react-router-dom'
import { useHistory, Redirect, Route } from "react-router-dom"

let timeout

const Navigation = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    let history = useHistory()

    const logout = event => {
        event.preventDefault()
        sessionStorage.removeItem('token')
        props.setToken(false)
        props.setUser(false)
        history.push("/")
        function stopTimeout(){
            clearTimeout(timeout)
        }
        stopTimeout()
    } 

    if (props.token && !timeout){
        function startTimeout(){
            timeout = setTimeout(function (){
                sessionStorage.removeItem('token')         
                history.push("/login")
                props.setToken(false)  
                props.setUser(false) 
                setTimeout(function(){
                    alert("Sorry, your session has timed out. You have been logged out and returned to the login page.")
                }, 1000) //Add small delay to alert to ensure previous lines run and complete first.      
            }, 1000*60*60*2) //token expires after two hours
        }
        startTimeout()
    } 

return (
    <Navbar style={{backgroundColor: '#000', opacity: '95%'}} expand="md" fixed="top">
        <Container>
        <NavbarBrand href=""><img className="navimg" src="assets/login.png" alt="#" /> EMR SYSTEM</NavbarBrand>
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
                {props.token
                ? (
                <>
                <NavItem className="private">
                    <NavLink tag={RouteLink} to="/login" onClick={logout}>Logout</NavLink>
                </NavItem></>
                  )
                : (
                <NavItem>
                    <NavLink tag={RouteLink} to="/login">Login</NavLink>  
                 </NavItem>
                  )          
                }           
            </Nav>
        </Collapse>
        </Container>
        
    </Navbar>
)
}

export default Navigation