import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container } from 'reactstrap'
import { Redirect, Route } from "react-router-dom"
import { useHistory } from "react-router";
import Scroll from '../backtotop'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Fade from 'react-reveal/Fade';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';


const Navigation = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setTimeout(function(){setAnchorEl(null); }, 5000);
  };

  const ScheduleRoute = (event, user) => {
    event.preventDefault();
    let path = `/submissions/`
    history.push(path, user);
}  


  const handleClose = () => {
    setAnchorEl(null);
  };

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
                        <Fade right>
                            <p id="ProfileAvatar">
                                <Avatar onClick={handleClick} alt="User Profile" src="https://source.unsplash.com/random/800x800/?face" />
                            </p>
                            <Menu
                                id="fade-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={(e) => profileViewRoute(e, props.user)}><AccountBoxIcon/>Profile</MenuItem>
                                <MenuItem onClick={ScheduleRoute}><CalendarTodayIcon/>Appointments</MenuItem>
                            </Menu>
                        </Fade>
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