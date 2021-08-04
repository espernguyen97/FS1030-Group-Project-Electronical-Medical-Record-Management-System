import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom"
import clsx from "clsx";
import {CssBaseline,Drawer,Divider,List, ListItem,ListItemIcon,ListItemText,makeStyles} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Search from '../search';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BugReportIcon from '@material-ui/icons/BugReport';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

let timeout;

const SideNav = (props) => {
  const classes = useStyles();
  const [open] = useState(true);
  let history = useHistory()

  const items = [
    {
      text: "Dashboard",
      icon: <HomeIcon />,
      path: "/submissions"
    },
    {
      text: "Patients",
      icon: <AccountCircleIcon />,
      path: "/Patients"
    },
    {
      text: "Tickets",
      icon: <AllInboxIcon />,
      path: "/Tickets"
    },
    {
      text: "Submit Ticket",
      icon: <BugReportIcon />,
      path: "/Submit_Ticket"
    },
    {
      text: "Care Givers",
      icon: <SupervisorAccountIcon />,
      path: "/CareGivers"
    },
    {
      text: "Logout",
      icon: <ExitToAppIcon />,
      path: "/logout",
      logout: function(event){
        event.preventDefault()
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('currentUser')
        props.setToken(false)
        props.setUser(false)
        history.push("/login")
        function stopTimeout(){
          clearTimeout(timeout)
        }
        stopTimeout()
      }
    }
  ];

  if (props.token && !timeout){
    function startTimeout(){
        timeout = setTimeout(function (){
            sessionStorage.removeItem('token')   
            sessionStorage.removeItem('currentUser')      
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
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}></div>
        {/* <Search/> Disabled search bar for now as we need to get Search working in patients first */}
        <Divider />
        <List>
          {items.map((item, index) => {
            if (item.text === "Logout"){
              return (
                <ListItem button key={index} onClick={item.logout}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              )
            } else {
              return (
                <ListItem button component={RouterLink} to={item.path} key={index}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              )
            }
          })}
        </List>
      </Drawer>
    </div>
  );
};

export default SideNav;
