import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import {CssBaseline,Drawer,Divider,List, ListItem,ListItemIcon,ListItemText,makeStyles} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ArchiveIcon from "@material-ui/icons/Archive";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Search from '../search';

const drawerWidth = 240;

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

const SideNav = (props) => {
  const classes = useStyles();
  const [open] = useState(true);

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
      icon: <SettingsIcon />,
      path: "/Tickets"
    },
    {
      text: "Care Givers",
      icon: <SettingsIcon />,
      path: "/CareGivers"
    },
    {
      text: "Logout",
      icon: <ArchiveIcon />,
      path: "#"
    }
  ];

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
        <div className={classes.toolbar}>
         
        </div>
                    <Search/>{/* search bar*/}
        <Divider />
        <List>
          {items.map((item, index) => (
            <ListItem button component={RouterLink} to={item.path} key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default SideNav;
