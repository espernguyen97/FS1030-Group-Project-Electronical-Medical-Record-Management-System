import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap'
import { NavLink as RouteLink } from 'react-router-dom'
import { useHistory,Redirect,Route } from "react-router-dom"




const Navigation = () => {
    let status = sessionStorage.getItem('token') 
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    const [token, setToken] = useState(status)
    let history = useHistory()

    const logout = event => {
        event.preventDefault()
        sessionStorage.removeItem('token')
        setToken(false)
        history.push("/")
    }

    if (status){
        setTimeout(function (){
            sessionStorage.removeItem('token')
            setToken(false)
            history.push("/login")
            setTimeout(function(){
                alert("Quit AFKing for so long, log back in to continue you session.")
            }, 2000)          
        }, 8000*10*10) 
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
                {token
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